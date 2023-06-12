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

export const addPost = async(_, { arg: newPost}) => {
  const { data, error } = await supabase
  .from('posts')
  .insert(newPost)
  .select()
  .single()
  console.log(data,error)

  return { data, error}
};

export const removePost = async() => {
  const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', id)
};

export const editPost = async(_, { arg:updatedPost}) => {
 const { data, error } = await supabase
  .from('posts')
  .update(updatedPost)
  .eq("id",updatedPost.id)
  .select()
  .single();

return { data, error };
};

