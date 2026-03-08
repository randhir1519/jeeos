import { createClient } from '@supabase/supabase-js';

// Credentials provided by user
const supabaseUrl = 'https://nvkuiowgnqzzqhbnfqai.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52a3Vpb3dnbnF6enFoYm5mcWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTU0MjIsImV4cCI6MjA4Nzk5MTQyMn0.MYkoFeHq2Lz0mEz1fMIpxSk_IVrLldEaPiTdxamzuOo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
