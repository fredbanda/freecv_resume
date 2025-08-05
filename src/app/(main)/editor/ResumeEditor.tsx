'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
//import GeneralInfoForm from './GeneralInfoForm'
import PersonalInfoForm from './PersonalInfoForm'

export default function ResumeEditor() {
  return (
    <>
      <div className="flex flex-grow flex-col">
        <header className="space-y-1.5 border-b px-3 py-5 text-center">
          <h1 className="text-2xl font-bold">Create your Resume or CV</h1>
          <p className="text-sm text-gray-500">
            Follow the steps below to create your resume or CV. Your texts will
            be saved automatically. You can also download your resume or CV as a
            PDF file to send with your job applications.
          </p>
        </header>
        <main className="relative grow">
          <div className="absolute bottom-0 top-0 flex w-full">
            <div className="w-full md:w1/2 overflow-y-auto">
            <PersonalInfoForm />
            </div>
            <div className="grow md:border-r" />
            <div className="hidden w-1/2 md:flex">right</div>
          </div>
        </main>

        <footer className="border-t px-3 py-5 text-center w-full">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button variant="secondary" className="cursor-pointer">
                Previous step
              </Button>
              <Button variant="default" className="cursor-pointer">
                Next step
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="cancel"
                size="lg"
                asChild
                className="cursor-pointer"
              >
                <Link href="/resumes">Cancel</Link>
              </Button>
              <p className="text-muted-foreground opacity-0">Saving ......</p>
            </div>
          </div>
        </footer>
      </div>
      ;
    </>
  )
}
