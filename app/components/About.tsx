import { BIO, OPENSOURCE_STATS } from '../../lib/constants'

export default function About() {
  return (
    <section id="about" className="space-y-3">
      <h2 className="text-3xl font-semibold">About Me</h2>
      <p className="text-gray-700 dark:text-gray-300 leading-7">
        {BIO} I have contributed {OPENSOURCE_STATS.prs.submitted} PRs to open-source, including
        shipped features, CI/CD improvements, and production bug fixes in a{' '}
        {OPENSOURCE_STATS.repository.stars} repository.
        <br />
        <br />I enjoy building fast, intuitive user experiences and reliable backend systems
        following clean architecture principles.
      </p>
    </section>
  )
}
