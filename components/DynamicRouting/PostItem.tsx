import Head from "next/head";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

type Props = {
  id: string | string[] | undefined;
};

type PostItem = {
  id: string;
  title: string;
  body: string;
};
export const PostItem: FC<Props> = ({ id }) => {
  const [item, setItem] = useState<PostItem>();
  useEffect(() => {
    if (!id) return;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((res: PostItem) => setItem(res));
  }, [id]);
  return (
    <main>
      {item && (
        <>
          <Head>
            <title>{item.title}</title>
          </Head>

          <h1>{item.title}</h1>

          <p>ID: {id}</p>
          <p>{item.body}</p>

          <Link href="/">
            <a>Go back to home</a>
          </Link>
        </>
      )}
    </main>
  );
};
