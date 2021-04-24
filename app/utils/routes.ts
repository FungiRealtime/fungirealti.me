export function isSamePathname(pathname1: string, pathname2: string) {
  if (pathname1 === pathname2) return true;

  if (pathname1[pathname1.length - 1] === "/") {
    return pathname1.slice(0, -1) === pathname2;
  }

  if (pathname2[pathname2.length - 1] === "/") {
    return pathname2.slice(0, -1) === pathname1;
  }
}
