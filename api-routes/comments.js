import { supabase } from "../lib/supabaseClient";
import { SupabaseAuthClient } from "@supabase/supabase-js";

//import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";
export const commentCacheKey = "/comments/";

export const getComments = async({ postId }) => {
  console.log({ postId})
  const { data, error } = await supabase
  .from('comments')
  .select() 
  .eq("post_id",postId)
  return { data, error };
};

export const addComment = async (_, { arg: newComment }) => {
  const { data, error } = await supabase
    .from("comments")
    .insert(newComment)
    .single()

  return { data, error }
};

export const removeComment = async(_,{ arg:id }) => {
  const { data, error } = await supabase
  .from('comments')
  .delete(id)
  .single()
  .eq("id",id)

  return { data, error }
};
