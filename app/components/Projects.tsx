export default function Projects() {
  return (
    <section id="projects" className="space-y-6">
      <h2 className="text-3xl font-semibold">Featured Projects</h2>

      <div className="space-y-10">
        {/* gesture-share */}
        <a
          href="https://github.com/sheikhlimon/gesture-share"
          target="_blank"
          className="block p-6 rounded-xl hover:bg-white/80 dark:hover:bg-zinc-800/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">gesture-share</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Cross-device gesture-controlled file sharing using React, MediaPipe,
            and WebRTC. Achieved 95%+ gesture accuracy and 80% faster setup
            using QR-based pairing.
          </p>
        </a>

        {/* crypto-guardian */}
        <a
          href="https://github.com/sheikhlimon/crypto-guardian"
          target="_blank"
          className="block p-6 rounded-xl hover:bg-white/80 dark:hover:bg-zinc-800/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">crypto-guardian</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Real-time crypto fraud detection system with sub-500ms scoring using
            multi-API validation (Etherscan, Blockchair, CoinGecko).
          </p>
        </a>
      </div>
    </section>
  );
}
