import { Metadata } from "next"
import ResumeClient from "./resume-client"
import { SITE_CONFIG } from "../../lib/constants"

export const metadata: Metadata = {
  title: `Resume - ${SITE_CONFIG.name}`,
  description: `Professional resume of ${SITE_CONFIG.name} - ${SITE_CONFIG.title} and Open Source Contributor`,
}

export default function ResumePage() {
  return <ResumeClient />
}
