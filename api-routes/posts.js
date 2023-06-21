import { supabase } from "../lib/supabaseClient";
import { uploadImage } from "../utils/uploadImage";
export const postCacheKey = "/posts/";

export const getPosts = async() => {
  const { data, error } = await supabase
  .from('posts')
  .select() 
  return { data, error };
};

export const getPost = async({ slug }) => {
 const { data, error } = await supabase
 .from('posts')
 .select("*") 
 .single()
 .eq("slug",slug);

return {data,error}
};

export const addPost = async(_, { arg: newPost}) => {
  let image = "";
console.log(newPost.image)
  if(newPost?.image) {
    const { publicUrl, error } = await uploadImage(newPost?.image);
    console.log(error)
    if (!error) {
      image = publicUrl;
    }  
  }

  console.log(image)

    const { data, error } = await supabase
   .from('posts')
   .insert({...newPost, image})
   .select()
   .single()
  

   return { data, error}
};

export const removePost = async(_,{arg:id}) => {
  const { error } = await supabase
  .from('posts')
  .delete()
  .eq('id', id)

  return {error}
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

