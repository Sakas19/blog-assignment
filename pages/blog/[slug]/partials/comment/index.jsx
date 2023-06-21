import Button from "@components/button";
import styles from "./comment.module.css";
import useSWRMutation from "swr/mutation";
import { removeComment, commentCacheKey } from "../../../../../api-routes/comments";


export default function Comment({ comment, createdAt, author, id }) {
  const { trigger: removeCommentTrigger, isLoading: isRemovingComment } = useSWRMutation(
    commentCacheKey,
    removeComment
  );

  const handleDelete = async () => {
    const { error } = await removeCommentTrigger(id);
  };

  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>

      {/* The Delete part should only be shown if you are authenticated and you are the author */}
      <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}


