import { NextPage } from "next";
import { useRouter } from "next/router";
import { PostItem } from "../../../../components/DynamicRouting/PostItem";

const Post: NextPage = () => {
  const router = useRouter(); // https://github.com/vercel/next.js/issues/4804#issuecomment-460754433
  return <PostItem id={router.query.id} />;
};

export default Post;
