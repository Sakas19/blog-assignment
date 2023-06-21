import styles from "./comments.module.css";
import Comment from "../comment";
import { getComments, commentCacheKey } from "../../../../../api-routes/comments";
import useSWR from "swr";
import { useEffect } from "react";

export default function Comments({ postId }) {
 
  const { data: { data = []} = {}, error } = useSWR(postId ? commentCacheKey : null, () => 
  getComments({ postId})
);

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {data.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
}
