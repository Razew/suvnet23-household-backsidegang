import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RootStackParamList } from '../navigators/RootStackNavigator';
import { container, image } from '../themes/styles';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { supabase } from '../database/supabase';
import { useAuth } from '../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { FileObject } from '@supabase/storage-js';
import { signUpOrLogIn } from '../database/migration';
import { Chore } from '../types/types';
type Props = NativeStackScreenProps<RootStackParamList, 'UploadFileTest'>;

export default function UploadFileTestScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileObject[]>([]);
  console.log(user);
  useEffect(() => {
    if (!user) return;

    // Load user images
    loadImages();
  }, [user]);

  const tempChore = {
    id: 1,
  } as Chore;

  const loadImages = async () => {
    const { data } = await supabase.storage
      .from('chores')
      .list(tempChore.id.toString());
    if (data) {
      setFiles(data);
    }
  };

  const ImageItem = ({
    item,
    choreId,
    onRemoveImage,
  }: {
    item: FileObject;
    choreId: number;
    onRemoveImage: () => void;
  }) => {
    const [image, setImage] = useState<string>('');

    supabase.storage
      .from('chores')
      .download(`${choreId}/${item.name}`)
      .then(({ data }) => {
        const fr = new FileReader();
        fr.readAsDataURL(data!);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      });

    return (
      <View
        style={{
          flexDirection: 'row',
          margin: 1,
          alignItems: 'center',
          gap: 5,
        }}
      >
        {image ? (
          <Image
            style={{ width: 80, height: 80 }}
            source={{ uri: image }}
          />
        ) : (
          <View style={{ width: 80, height: 80, backgroundColor: '#1A1A1A' }} />
        )}
        <Text style={{ flex: 1, color: '#fff' }}>{item.name}</Text>
        {/* Delete image button */}
        <TouchableOpacity onPress={onRemoveImage}>
          <Ionicons
            name="trash-outline"
            size={20}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const uploadImage = async (uri: string) => {
    let filetype = uri.split('.').pop();
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { data, error } = await supabase.storage
      .from('chores')
      .upload(`${tempChore.id}/${Date.now()}.${filetype}`, base64, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading file: ', error.message);
    } else {
      console.log('File uploaded: ', data);
      loadImages();
    }
  };

  const onSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        uploadImage(result.assets[0].uri);
      }
    }
  };

  return (
    <View style={container}>
      <ScrollView>
        {files.map((item, index) => (
          <ImageItem
            key={item.id}
            item={item}
            choreId={tempChore.id}
            onRemoveImage={() => {
              supabase.storage
                .from('files')
                .remove([`${tempChore.id}/${item.name}`])
                .then(() => {
                  loadImages();
                });
            }}
          />
        ))}
      </ScrollView>
      {/* FAB to add images */}
      <TouchableOpacity
        onPress={onSelectImage}
        style={styles.fab}
      >
        <Ionicons
          name="camera-outline"
          size={30}
          color={'#fff'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151515',
  },
  fab: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 40,
    right: 30,
    height: 70,
    backgroundColor: '#2b825b',
    borderRadius: 100,
  },
});
