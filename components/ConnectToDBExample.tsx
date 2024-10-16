import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { Avatar } from '../types/types';
import { supabase } from '../utils/supabase';

export default function App() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  useEffect(() => {
    getAvatars();
  }, []);

  const getAvatars = async () => {
    try {
      const { data: avatars, error } = await supabase.from('avatar').select();
      if (error) {
        throw error;
      }
      if (avatars && avatars.length > 0) {
        setAvatars(avatars);
      } else {
        console.log('No avatars found');
      }
    } catch (error) {
      console.error('Error fetching avatars:', (error as Error).message);
    }
  };

  const insertSharkAvatar = async () => {
    try {
      const { data, error } = await supabase
        .from('avatar')
        .insert([{ name: 'Shark', emoji: '🦈' }]);

      if (error) {
        throw error;
      }

      console.log('Shark avatar inserted successfully:', data);
      getAvatars(); // Refresh the avatars list
    } catch (error) {
      console.error('Error inserting shark avatar:', (error as Error).message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>total Avatars: {avatars.length}</Text>
      {avatars.map((a) => (
        <View key={a.id}>
          <Text>{a.emoji}</Text>
        </View>
      ))}
      <Button
        title="Insert Shark Avatar"
        onPress={insertSharkAvatar}
      />
    </View>
  );
}
