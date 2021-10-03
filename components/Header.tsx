import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [id, setId] = useState("1");
  return (
    <div>
      <Link href="/">
        <a style={styles.a}>Home</a>
      </Link>
      <Link href="/dynamic-import">
        <a style={styles.a}>Dynamic Import</a>
      </Link>
      <div>
        <h2>Routing</h2>
        <div>
          <label htmlFor="post-id-input">Post ID: </label>
          <input
            id="post-id-input"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <h3>Static Path (ID: 1~10)</h3>
        <ul>
          <li>
            <Link href={`/post/static/${id}`}>
              <a>Go to post/</a>
            </Link>
          </li>
        </ul>
        <h3>Dynamic Routing (getInitialProps)</h3>
        <ul>
          <li>
            <Link href={`/post/dynamic/getInitialProps/${id}`}>
              <a>Go to post/dynamic/getInitialProps</a>
            </Link>
          </li>
        </ul>
        <h3>Dynamic Routing (CSR)</h3>
        <ul>
          <li>
            <Link href={`/post/dynamic/csr/${id}`}>
              <a>Go to post/dynamic/csr</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  a: {
    marginRight: 10,
  },
};
