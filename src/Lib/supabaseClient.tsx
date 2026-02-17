import { createClient } from '@supabase/supabase-js'

const debugFetch: typeof fetch = async (input, init) => {
  console.log("➡️ Request:", input, init);
  const res = await fetch(input, init);
  console.log("⬅️ Response:", res.clone());
  return res;
};

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!,
  { global: { fetch: debugFetch } }
);