import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: true,
  },
  async redirects() {
    return [
      {
        source: "/posts",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
