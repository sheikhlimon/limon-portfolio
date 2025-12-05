import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Sheikh Limon",
  description: "Blog posts by Sheikh Limon - Full-Stack Developer",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-5 py-20">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Coming soon!
          </p>
          <div className="flex justify-center">
            <div className="animate-pulse">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}