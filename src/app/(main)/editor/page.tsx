''

import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";
import { Suspense } from "react";

export const metadata: Metadata ={
    title: "Design your Resume or CV",
    description: "Start creating your resume or CV now with FreeCVResumes."
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeEditor />
    </Suspense>
)
}