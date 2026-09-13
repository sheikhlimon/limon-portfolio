export default function Loading() {
  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 w-full flex flex-col gap-8 pt-6 sm:pt-8 opacity-60">
      {/* Top navigation */}
      <div className="h-5 w-20 bg-gray-100 dark:bg-zinc-900 rounded border border-dashed border-gray-200/60 dark:border-gray-800/60" />

      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-72 bg-gray-100 dark:bg-zinc-900 rounded" />
          <div className="h-4 w-96 max-w-full bg-gray-100 dark:bg-zinc-900 rounded" />
        </div>

        <div className="flex items-center gap-6 sm:gap-8">
          <div className="flex items-baseline gap-2.5">
            <div className="h-12 w-16 bg-gray-100 dark:bg-zinc-900 rounded" />
            <div className="h-3 w-16 bg-gray-100 dark:bg-zinc-900 rounded" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <div className="h-12 w-14 bg-gray-100 dark:bg-zinc-900 rounded" />
            <div className="h-3 w-12 bg-gray-100 dark:bg-zinc-900 rounded" />
          </div>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        {/* Left column */}
        <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800/80 bg-white dark:bg-zinc-950 p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-gray-100 dark:bg-zinc-900 rounded" />
            <div className="h-4 w-20 bg-gray-100 dark:bg-zinc-900 rounded" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-gray-100 dark:bg-zinc-900 rounded-full" />
            <div className="h-8 w-16 bg-gray-100 dark:bg-zinc-900 rounded-full" />
            <div className="h-8 w-16 bg-gray-100 dark:bg-zinc-900 rounded-full" />
          </div>
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 py-3 border-t border-dashed border-gray-200 dark:border-gray-800/80"
              >
                <div className="w-8 h-8 rounded-[10px] bg-gray-100 dark:bg-zinc-900 shrink-0 border border-gray-200/60 dark:border-gray-800/60" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-3/4 bg-gray-100 dark:bg-zinc-900 rounded" />
                  <div className="h-3 w-1/3 bg-gray-100 dark:bg-zinc-900 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800/80 bg-white dark:bg-zinc-950 p-5 space-y-4">
            <div className="h-6 w-36 bg-gray-100 dark:bg-zinc-900 rounded" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-6 w-28 bg-gray-100 dark:bg-zinc-900 rounded-full" />
                  <div className="h-2 flex-1 bg-gray-100 dark:bg-zinc-900 rounded-full" />
                  <div className="h-4 w-6 bg-gray-100 dark:bg-zinc-900 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
