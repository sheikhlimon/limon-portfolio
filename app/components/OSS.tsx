import { OPENSOURCE_STATS } from '../../lib/constants'

export default function OSS() {
  return (
    <section id="oss" className="space-y-6">
      <h2 className="text-3xl font-semibold">Open-Source Contributions</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">
            <a
              href={OPENSOURCE_STATS.repository.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {OPENSOURCE_STATS.repository.name} ({OPENSOURCE_STATS.repository.stars})
            </a>
          </h3>
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
          {OPENSOURCE_STATS.prs.submitted} PRs submitted, {OPENSOURCE_STATS.prs.merged} merged
          across multiple organizations.
        </p>
      </div>
    </section>
  )
}
