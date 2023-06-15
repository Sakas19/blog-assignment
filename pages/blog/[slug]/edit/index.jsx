import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { createSlug } from "@/utils/createSlug";
import { editPost } from "../../../../api-routes/posts";
import { postCacheKey } from "../../../../api-routes/posts";

import BlogEditor from "../../../../components/blog-editor";

const mockData = {
  title: "Community-Messaging Fit",
  body: "<p>This is a good community fit!</p>",
  image:
    "https://media.wired.com/photos/598e35fb99d76447c4eb1f28/16:9/w_2123,h_1194,c_limit/phonepicutres-TA.jpg",
};

export default function EditBlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const { 
    data: { data: post = {} } = {},
    error, 
    isLoading, 
  } = useSWR(
    slug ? `${postCacheKey}/${slug}` : null,
    () => getPost({})
  );

  const { trigger: editPostTrigger } = useSWRMutation(
    `${postCacheKey}/${slug}`,
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

    console.log(updatedPost);

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
      title={mockData.title}
      src={mockData.image}
      alt={mockData.title}
      content={mockData.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}
