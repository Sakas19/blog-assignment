import { supabase } from "../lib/supabaseClient";

export const uploadImage = async (file) => {
  console.log(file);

  const fullFileName = file.name.split(".");
  const fileName = fullFileName[0];
  const fileExt = fullFileName[1];

  const filePath = `${fileName}-${Math.random()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { error };
  }

  const {
    data: { PublicUrl },
    error: PublicUrlError,
  } = await supabase.storage.from("images").getPublicUrl(data.path);

  return {
    error: false,
    publicUrl: PublicUrl,
  };
};



