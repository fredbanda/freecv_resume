'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { steps } from './steps';
import Breadcrumbs from './Breadcrumbs';
import { Footer } from './_components/Footer';
import { ResumeValues } from '@/lib/validation';
import ResumePreviewSection from './forms/ResumePreviewSection';

export default function ResumeEditor() {
  const searchParams = useSearchParams();
  const [resumeData, setResumeData] = useState<ResumeValues>({} as ResumeValues);


  const currentStep = searchParams.get('step') || steps[0].key

  function setStep(step: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('step', step)
    window.history.pushState({}, '', `?${newSearchParams.toString()}`)
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component

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
              <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
              {FormComponent && <FormComponent resumeData={resumeData} setResumeData={setResumeData} />}
            </div>
            <div className="grow md:border-r" />
            <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
             />
          </div>
        </main>
        <Footer currentStep={currentStep} setCurrentStep={setStep} />
      </div>
      ;
    </>
  )
}
