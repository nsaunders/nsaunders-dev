const username = "nsaunders";

export async function getByName(name: string) {
  const res = await fetch(
    `https://raw.githubusercontent.com/${username}/writing/master/pages/${name}/index.md`
  );
  if (!res.ok) {
    throw new Error(
      `An error occurred while fetching page "${name}": ${res.statusText}`
    );
  }
  return { name, markdown: await res.text() };
}
