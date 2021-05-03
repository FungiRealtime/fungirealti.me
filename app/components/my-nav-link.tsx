import {
  Link,
  LinkProps,
  useLocation,
  useResolvedPath,
} from "react-router-dom";

interface MyNavLinkProps extends LinkProps {
  activeClassName?: string;
  caseSensitive?: boolean;
  end?: boolean;
  navigation?: "browser" | "js";
}

// This component does the same as react router's <NavLink> with the difference
// that the className is replaced with the activeClassName if the link is active
// instead of appending it. It also uses an <a> tag instead of a <Link> by default
// to let the browser handle the navigation.
export function MyNavLink({
  className: classNameProp,
  to,
  activeClassName,
  caseSensitive,
  end,
  navigation = "browser",
  ...rest
}: MyNavLinkProps) {
  let location = useLocation();
  let path = useResolvedPath(to);

  let locationPathname = location.pathname;
  let toPathname = path.pathname;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    toPathname = toPathname.toLowerCase();
  }

  let isActive = end
    ? locationPathname === toPathname
    : locationPathname.startsWith(toPathname);

  let className = isActive ? activeClassName : classNameProp;

  return navigation === "browser" ? (
    <a href={toPathname} className={className} {...rest} />
  ) : (
    <Link className={className} to={to} {...rest} />
  );
}
