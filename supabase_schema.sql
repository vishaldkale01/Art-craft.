-- BlogPosts table
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text, -- Added title column
  description text,
  image_url text,
  date date,
  url text,
  created_at timestamptz default now()
);

-- Artworks table
create table if not exists artworks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  category text,
  created_at timestamptz default now()
);

-- About table (single row)
create table if not exists about (
  id serial primary key,
  about_text text,
  education text[],
  exhibitions text[],
  image_url text
);

-- Contact table (single row)
create table if not exists contact (
  id serial primary key,
  address text,
  phone text,
  email text,
  studio_hours text[]
);

-- Messages table
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  date timestamptz default now()
);

-- Gallery Categories table
create table if not exists gallery_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);
