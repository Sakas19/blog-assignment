import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { createSlug } from "@/utils/createSlug";
import { editPost,getPost, postsCacheKey } from "../../../../api-routes/posts";

import BlogEditor from "../../../../components/blog-editor";


export default function EditBlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const { 
    data: { data: post = {} } = {},
    error, 
    isLoading, 
  } = useSWR(
    slug ? `${postsCacheKey}/${slug}` : null,
    () => getPost({slug})
  );

  const { trigger: editPostTrigger, isMutating } = useSWRMutation(
    `${postsCacheKey}/${slug}`,
    editPost
  );

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const updatedSlug = createSlug(titleInput);

    const updatedPost = {
      id: post.id,
      body: editorContent,
      title: titleInput,
      slug: updatedSlug,
      image,
    };

    //console.log(updatedPost);

    const { data, error } = await editPostTrigger(updatedPost);
      //console.log({ data, error})

    if (!error) {
      router.push(`/blog/${slug}`);
    }
  };

  if (isLoading) {
    return "...Loading";
  }

  return (
    <BlogEditor
      heading="Edit blog post"
      title={post.title}
      src={post.image}
      alt={post.title}
      content={post.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}


