create policy "Enable read access for all users"
on "public"."avatar"
for select using (true);

create policy "Enable read access for all users"
on "public"."chore"
for select using (true);

create policy "Enable read access for all users"
on "public"."chore_to_user"
for select using (true);

create policy "Enable read access for all users"
on "public"."household"
for select using (true);

create policy "Enable read access for all users"
on "public"."user"
for select using (true);

create policy "Enable read access for all users"
on "public"."user_to_household"
for select using (true);