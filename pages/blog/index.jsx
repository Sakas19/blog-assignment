import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import useSWR from "swr"
import { getPosts, postsCacheKey } from "../../api-routes/posts";

export default function Blog() {
  const { data,error } = useSWR(postsCacheKey,getPosts)
  const {data: posts = []} = data || {}
  //console.log(posts)
  
  if (error) {
    return <div>failed to load</div>
  }
  return (
    <section>
      <Heading>Blog</Heading>
      {posts.map((post) => (
        <Link
          key={post.slug}
          className={styles.link}
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p>{post.title}</p>
            <time className={styles.date}>{post.created_at}</time>
          </div>
        </Link>
      ))}
    </section>
  );
}
