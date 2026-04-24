import { Metadata } from "next"
import ResumeClient from "./resume-client"

export const metadata: Metadata = {
  title: "Resume - Sheikh Limon",
  description:
    "Professional resume of Sheikh Limon - Full-Stack Developer and Open Source Contributor",
}

export default function ResumePage() {
  return <ResumeClient />
}
