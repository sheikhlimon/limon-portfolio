import { SOCIAL_LINKS } from '../../lib/constants'

export default function Contact() {
  return (
    <section id="contact" className="space-y-8">
      <h2 className="text-xl font-medium text-gray-900 dark:text-white">Find me on</h2>
      <div className="flex justify-center items-center gap-6">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            className={`p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group ${
              link.name === 'LinkedIn'
                ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
                : 'group-hover:text-gray-900 dark:group-hover:text-white'
            }`}
            aria-label={link.name}
            title={link.name}
          >
            <svg
              className={`w-6 h-6 text-gray-600 dark:text-gray-400 transition-colors ${
                link.name === 'LinkedIn'
                  ? 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  : 'group-hover:text-gray-900 dark:group-hover:text-white'
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d={link.path} />
            </svg>
          </a>
        ))}
      </div>
    </section>
  )
}
