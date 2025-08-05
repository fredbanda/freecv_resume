import { Button } from "@/components/ui/button"
import Link from "next/link"
import { steps } from "../steps"

interface FooterProps {
    currentStep: string
    setCurrentStep: (step: string) => void
}

export const Footer = ({currentStep, setCurrentStep}: FooterProps) => {
    const previousStep = steps.find(
        (_, index) => steps[index + 1]?.key === currentStep
    )?.key

    const nextStep = steps.find(
        (_, index) => steps[index -1]?.key === currentStep
    )
    return (
        <>
                <footer className="border-t px-3 py-5 text-center w-full">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
            <div className="flex items-center gap-3">
              <Button 
              variant="secondary" 
              className="cursor-pointer"
                onClick={() => {
                  if (previousStep) {
                    setCurrentStep(previousStep)
                  }
                }}
                disabled={!previousStep}
              >
                Previous step
              </Button>
              <Button variant="default" 
              className="cursor-pointer"
                onClick={() => {
                  if (nextStep) {
                    setCurrentStep(nextStep.key)
                  }
                }}
                disabled={!nextStep}
              >
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
        </>
    )
}