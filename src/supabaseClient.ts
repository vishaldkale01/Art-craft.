import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rzcpwquujnnwtfxcipue.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6Y3B3cXV1am5ud3RmeGNpcHVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NjkwMjQsImV4cCI6MjA2NzE0NTAyNH0.zKJ0HUIRN3ZfdCOF0yAPGJGk-OmcTS_f43cJlrvtLaM';

export const supabase = createClient(supabaseUrl, supabaseKey);
