import React from "react"
import zlib from "zlib"

function encodeKroki(text: string): string {
  const compressed = zlib.deflateSync(Buffer.from(text, "utf8"))
  return compressed.toString("base64").replace(/\+/g, "-").replace(/\//g, "_")
}

export default function D2Diagram({ chart }: { chart: string }) {
  const encoded = encodeKroki(chart)
  const lightUrl = `https://kroki.io/d2/svg/${encoded}?theme=1&pad=10`
  const darkUrl = `https://kroki.io/d2/svg/${encoded}?theme=200&pad=10`

  return (
    <div className="flex justify-center my-6 overflow-x-auto border border-dashed border-gray-200 dark:border-gray-800/80 p-3 sm:p-4 rounded-lg bg-gray-50/50 dark:bg-zinc-950/40">
      {/* Light mode diagram (Theme 1: Neutral Grey) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lightUrl}
        alt="Architecture diagram"
        className="block dark:hidden max-h-[360px] sm:max-h-[400px] w-auto h-auto max-w-full rounded object-contain"
        loading="lazy"
      />
      {/* Dark mode diagram (Theme 200: Catppuccin / Terminal) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={darkUrl}
        alt="Architecture diagram"
        className="hidden dark:block max-h-[360px] sm:max-h-[400px] w-auto h-auto max-w-full rounded object-contain"
        loading="lazy"
      />
    </div>
  )
}
