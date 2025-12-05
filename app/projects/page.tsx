import { Metadata } from "next";
import Projects from "../components/Projects";

export const metadata: Metadata = {
  title: "Projects - Sheikh Limon",
  description: "Featured projects by Sheikh Limon - Full-Stack Developer",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-5 py-20">
        <Projects />
      </div>
    </div>
  );
}