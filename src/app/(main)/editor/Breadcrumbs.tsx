import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { steps } from './steps'

interface BreadcrumbsProps {
  currentStep: string
  setCurrentStep: (step: string) => void
}

export default function Breadcrumbs({
  currentStep,
  setCurrentStep,
}: BreadcrumbsProps) {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <BreadcrumbItem>
                {step.key === currentStep ? (
                  <BreadcrumbPage>{step.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button
                      onClick={() => setCurrentStep(step.key)}
                      
                    >
                      {step.title}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {index < steps.length - 1 && (
                <BreadcrumbSeparator className="text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}
