import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import { addPost } from "../../api-routes/posts";
import { postCacheKey } from "../../api-routes/posts";
import useSWRMutation from "swr/mutation"
import { useRouter } from "next/router";

export default function CreatePost() {
  const router = useRouter()
  const { trigger: addPostTrigger, isMutating } = useSWRMutation(

    postCacheKey,

    addPost

  );
  const handleOnSubmit = async({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);
    //console.log({ editorContent, titleInput, image, slug });
    const newPost = {
      slug,
      title: titleInput,
      body: editorContent,
      image,
    }
    
     const { data, error } = await addPostTrigger(newPost);
     if(!error) {
      router.push(`/blog/${slug}`);
     }
  };

  return (
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
  );
}
