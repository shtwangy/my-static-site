import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Error from "next/error";
import { removePathTrailingSlash } from "next/dist/client/normalize-trailing-slash";
import { denormalizePagePath } from "next/dist/server/denormalize-page-path";
import {
  isDynamicRoute,
  getRouteRegex,
} from "next/dist/shared/lib/router/utils";

function resolveDynamicRoute(pathname: string, pages: string[]): string {
  const cleanPathname = removePathTrailingSlash(denormalizePagePath(pathname!));

  if (cleanPathname === "/404" || cleanPathname === "/_error") {
    return pathname;
  }

  // handle resolving href for dynamic routes
  if (!pages.includes(cleanPathname!)) {
    // eslint-disable-next-line array-callback-return
    pages.some((page) => {
      if (isDynamicRoute(page) && getRouteRegex(page).re.test(cleanPathname!)) {
        pathname = page;
        return true;
      }
    });
  }
  return removePathTrailingSlash(pathname);
}

export default function NotFoundPage() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      if (!Router || !Router.router) return;
      const pages = await Router.router.pageLoader.getPageList();
      const pathname = resolveDynamicRoute(router.asPath, pages);
      if (pathname && pages.includes(pathname)) {
        router.replace(pathname, router.asPath);
      } else {
        setIsError(true);
      }
    })();
  }, []);

  return <>{isError && <Error statusCode={404} />}</>;
}
