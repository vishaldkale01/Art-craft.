-- Dummy data for BlogPosts
insert into blog_posts (description, image_url, date, url)
values
('First blog post', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80', '2025-07-01', 'https://example.com/first'),
('Second blog post', 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?q=80', '2025-07-02', 'https://example.com/second');

-- Dummy data for Artworks
insert into artworks (title, description, image_url, category)
values
('Sunset', 'A beautiful sunset painting.', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80', 'Paintings'),
('Modern Sculpture', 'Abstract modern sculpture.', 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?q=80', 'Sculptures');

-- Dummy data for About (single row)
insert into about (id, about_text, education, exhibitions, image_url)
values
(1, 'About the artist...', ARRAY['MFA, Art School', 'BFA, College'], ARRAY['Solo Show 2024', 'Group Show 2023'], 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80')
on conflict (id) do update set about_text=excluded.about_text, education=excluded.education, exhibitions=excluded.exhibitions, image_url=excluded.image_url;

-- Dummy data for Contact (single row)
insert into contact (id, address, phone, email, studio_hours)
values
(1, '123 Main St, City', '+1 555-1234', 'artist@example.com', ARRAY['Mon-Fri: 10-6', 'Sat: By Appointment'])
on conflict (id) do update set address=excluded.address, phone=excluded.phone, email=excluded.email, studio_hours=excluded.studio_hours;

-- Dummy data for Messages
insert into messages (name, email, message)
values
('John Doe', 'john@example.com', 'Hello, I love your work!'),
('Jane Smith', 'jane@example.com', 'Interested in a commission.');

-- Dummy data for Gallery Categories
insert into gallery_categories (name)
values
('Paintings'), ('Sculptures'), ('Digital Art')
on conflict (name) do nothing;
