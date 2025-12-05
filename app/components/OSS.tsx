export default function OSS() {
  return (
    <section id="oss" className="space-y-6">
      <h2 className="text-3xl font-semibold">Open-Source Contributions</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">block/goose (22k★)</h3>
          <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300">
            <li>
              Implemented <code>--output-format json</code> (130+ LOC)
            </li>
            <li>Fixed repeated 404 errors caused by stale session logic</li>
            <li>Added context menu UI/UX improvements</li>
            <li>Improved CI/CD workflows and automation</li>
          </ul>
        </div>

        <p className="text-gray-700 dark:text-gray-300">
          45+ PRs submitted, 34+ merged across multiple organizations.
        </p>
      </div>
    </section>
  );
}
