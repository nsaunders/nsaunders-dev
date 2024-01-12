import * as GH from "./github";

const username = "nsaunders";

export async function getByName(
  name: string,
  ctx: Parameters<typeof GH.configureRequest>[1]
) {
  const res = await fetch(
    `https://raw.githubusercontent.com/${username}/writing/master/pages/${name}/index.md`,
    GH.configureRequest({}, ctx)
  );
  if (!res.ok) {
    throw new Error(
      `An error occurred while fetching page "${name}": ${res.statusText}`
    );
  }
  return { name, markdown: await res.text() };
}
