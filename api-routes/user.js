import { supabase } from "../lib/supabaseClient";
export const userCacheKey = "/user/";

export const getUser = async() => {
  const { data, error } = await supabase
  .from('users')
  .select() 
  return { data, error };
};
