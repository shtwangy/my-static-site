import Link from "next/link";
import Head from "next/head";
import { NextPage } from "next";

interface Props {
  id: string;
  title: string;
  body: string;
}

const Post: NextPage<Props> = ({ id, title, body }) => {
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

// next linkを使用してgetInitialPropsを使用しているページにクライアントサイドでルーティングを行うと
// 事前にnext exportで生成したファイルではなく再度クライアント側でgetInitialPropsが実行される
Post.getInitialProps = async (context): Promise<Props> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${context.query.id}`
  );
  const post = await response.json();
  return post;
};

export default Post;
