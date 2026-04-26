export default function Loading() {
  return (
    <div className="pt-2 pb-12 w-full animate-pulse">
      <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border border-zinc-400/70 dark:border-zinc-500/50 rounded-lg p-5 space-y-3"
          >
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="flex gap-4">
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
