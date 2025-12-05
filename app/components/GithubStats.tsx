export default async function GithubStats() {
  const res = await fetch("https://api.github.com/users/sheikhlimon", {
    next: { revalidate: 3600 }, // cache 1 hour
  });
  const data = await res.json();

  return (
    <div className="border p-6 rounded-xl">
      <h3 className="text-xl font-semibold">GitHub Stats</h3>

      <p className="mt-3 text-gray-700 dark:text-gray-300">
        Public Repos: {data.public_repos}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Followers: {data.followers}
      </p>
    </div>
  );
}
