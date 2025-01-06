import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://iguwqlnptjgnjxcrhznq.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndXdxbG5wdGpnbmp4Y3JoenFuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjg4MjM2MCwiZXhwIjoyMDQ4NDU4MzYwfQ.3nkhtOw3GI5ALW5j92dEaD76JglTNEq_a8BlHHQSW1s';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
