import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://iguwqlnptjgnjxcrhznq.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndXdxbG5wdGpnbmp4Y3JoenFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4ODIzNjAsImV4cCI6MjA0ODQ1ODM2MH0.pHo6qbhgihxQKjeOjsSkGw_amTG5RWOXUae9dKIZM2I';

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
