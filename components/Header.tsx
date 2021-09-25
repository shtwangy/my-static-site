import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Link href="/">
        <a style={styles.a}>Home</a>
      </Link>

      <Link href="/dynamic-import">
        <a style={styles.a}>Dynamic Import</a>
      </Link>
    </div>
  );
}

const styles = {
  a: {
    marginRight: 10,
  },
};
