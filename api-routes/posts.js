import { supabase } from "../lib/supabaseClient";
export const postCacheKey = "/posts/";

export const getPosts = async() => {
  const { data, error } = await supabase
  .from('posts')
  .select() 
  return { data, error };
};

export const getPost = async() => {
 const { data, error } = await supabase
 .from('posts')
 .select("*") 
 .single()
.eq("slug",slug);

return {data,error}
};

export const addPost = async() => {
  const { data, error } = await supabase
  .from('posts')
  .select()
};

export const removePost = async() => {
  const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', )
};

export const editPost = () => {
  //Handle edit post here
};
