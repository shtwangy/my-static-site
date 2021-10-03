import { NextPage } from "next";
import { useRouter, withRouter } from "next/router";
import { PostItem } from "../../../../components/DynamicRouting/PostItem";

const Post: NextPage = withRouter(({ router }) => {
  // const router = useRouter(); // https://github.com/vercel/next.js/issues/4804#issuecomment-460754433
  console.log(router.asPath);

  return <PostItem id={"1"} />;
});

export default Post;
