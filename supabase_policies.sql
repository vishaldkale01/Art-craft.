-- Enable RLS and allow full access for development

-- BlogPosts
alter table blog_posts enable row level security;
create policy "Allow all" on blog_posts for all using (true) with check (true);

-- Artworks
alter table artworks enable row level security;
create policy "Allow all" on artworks for all using (true) with check (true);

-- About
alter table about enable row level security;
create policy "Allow all" on about for all using (true) with check (true);

-- Contact
alter table contact enable row level security;
create policy "Allow all" on contact for all using (true) with check (true);

-- Messages
alter table messages enable row level security;
create policy "Allow all" on messages for all using (true) with check (true);

-- Gallery Categories
alter table gallery_categories enable row level security;
create policy "Allow all" on gallery_categories for all using (true) with check (true);
