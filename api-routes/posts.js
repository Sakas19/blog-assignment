import { supabase } from "../lib/supabaseClient";
import { uploadImage } from "../utils/uploadImage";
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
  let image = ""

  if(newPost?.image) {
    const { publicUrl, error } = await uploadImage(newPost?.image);

    if (!error) {
      image = publicUrl;
    }
    //create function that takes in the uploaded image from the client 
    //upload it yo our bucket
    //get the public url and return it
  
  }
    const { data, error } = await supabase
   .from('posts')
   .insert({...newPost, Image})
   .select()
   .single()
  

   return { data, error}
};

export const removePost = async() => {
  const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', id)
};

export const editPost = async(_, { arg:updatedPost}) => {
let image = updatedPost?.image?? "";

const isNewImage = typeof image === "object" && image !== null;

if (isNewImage) {
  const { publicUrl, error } = await uploadImage(updatedPost?.image);

  if (!error) {
    image = publicUrl;
  }
}

const { data, error } = await supabase
  .from('posts')
  .update(...updatedPost,image)
  .eq("id",updatedPost.id)
  .select()
  .single();

return { data, error };
};

