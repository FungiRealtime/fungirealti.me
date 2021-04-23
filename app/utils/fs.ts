import { promises as fs } from "fs";

/**
 *
 * @param parentRoute The parent route, imagine the following routes folder structure.
 * ```
 * ├── dashboard
 * │   ├── something.tsx
 * │   └── index.tsx
 * └── dashboard.tsx
 * ```
 * The parent route here would be `/dashboard`.
 * @returns an array of child routes.
 */
export async function getChildRoutes(parentRoute: string) {
  let files = await fs.readdir(`./app/routes${parentRoute}`);
  let childRoutes = files.map((file) => {
    let fileWithoutExtension = file.split(".").slice(0, -1).join(".");
    if (fileWithoutExtension === "index") {
      return `${parentRoute}/`;
    }

    return `${parentRoute}/${fileWithoutExtension}`;
  });

  return childRoutes;
}
