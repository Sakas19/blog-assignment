import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
export const commentCacheKey = "/comments/";

export const getComments = async() => {
  const { data, error } = await supabase
  .from('comments')
  .select() 
  return { data, error };
};

export const addComment = () => {
  // const { data, error } = await supabase
  // .from('comments')
  // .insert([
  //   { some_column: 'someValue', other_column: 'otherValue' },
  // ])

};

export const removeComment = () => {
  //Handle remove comment here
};
