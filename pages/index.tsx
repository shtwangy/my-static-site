import { useState } from "react";
import dynamic from "next/dynamic";

const DynamicComponentBasic = dynamic(() => import("../components/hello1"));

const DynamicComponentWithCustomLoading = dynamic(
  () => import("../components/hello2"),
  { loading: () => <p>...</p> }
);

const DynamicComponentWithNoSSR = dynamic(
  () => import("../components/hello3"),
  { ssr: false }
);

const DynamicComponentNamedExport = dynamic<{}>(() =>
  import("../components/NamedExportComponent").then(
    ({ NamedExportComponent }) => NamedExportComponent
  )
);

import type { NamedExportComponentProps } from "../components/NamedExportComponent";
const DynamicComponentNamedExportWithProps = dynamic<NamedExportComponentProps>(
  () =>
    import("../components/NamedExportComponent").then(
      ({ NamedExportComponentWithProps }) => NamedExportComponentWithProps
    )
);

// Next.js v11.1.1でReact.lazyがサポートされた
// https://github.com/vercel/next.js/releases/tag/v11.1.1
// https://github.com/vercel/next.js/pull/27611
// ※後に型エラーのバグが報告されv11.1.3-canary4でバグ修正が行われている
// https://github.com/vercel/next.js/releases/tag/v11.1.3-canary.4
// https://github.com/vercel/next.js/pull/28740
// ただこれはReact 18でSuspenseがSSRに対応したことを前提とした修正となっており
// React 18が正式リリースされていない現在はまだ利用できなさそう
// const DynamicLazyComponent = dynamic(
//     () => import('../components/hello1'),
//     { suspense: true }
// )

const names = ["Tim", "Joe", "Bel", "Max", "Lee"];

export default function Home() {
  const [showMore, setShowMore] = useState(false);
  const [results, setResults] = useState<any>();
  return (
    <>
      {/* すぐに読み込まれるが、バンドルは別になる */}
      <DynamicComponentBasic />

      {/* 読み込み中にdynamicに設定したローダーを表示する */}
      <DynamicComponentWithCustomLoading />

      {/* クライアント側のみで読み込まれる */}
      <DynamicComponentWithNoSSR />

      {/* 名前付きExportされているコンポーネント */}
      <DynamicComponentNamedExport />
      <DynamicComponentNamedExportWithProps title={"タイトル"} />

      {/* Load on demand */}
      {showMore && <DynamicComponentBasic />}
      <button onClick={() => setShowMore(!showMore)}>Toggle Show More</button>
      <div style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Search"
          onChange={async (e) => {
            const { value } = e.currentTarget;
            // Dynamically load fuse.js
            const Fuse = (await import("fuse.js")).default;
            const fuse = new Fuse(names);

            setResults(fuse.search(value));
          }}
        />
        <pre>Results: {JSON.stringify(results, null, 2)}</pre>
      </div>
      {/*<div>*/}
      {/*    <Suspense fallback={`loading`}>*/}
      {/*        <DynamicLazyComponent />*/}
      {/*    </Suspense>*/}
      {/*</div>*/}
    </>
  );
}
