import Link from "next/link";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

// ここで取得したidしか受け付けない
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_page=1"
  );
  const postList = await response.json();
  return {
    paths: postList.map((post: { id: string }) => {
      return {
        params: {
          id: `${post.id}`,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error();
  // fetch single post detail
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await response.json();
  return {
    props: post,
  };
};

const Post = ({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) => {
  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>

      <h1>{title}</h1>

      <p>ID: {id}</p>
      <p>{body}</p>

      <Link href="/">
        <a>Go back to home</a>
      </Link>
    </main>
  );
};

export default Post;
