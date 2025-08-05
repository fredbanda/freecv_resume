/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { EditorFormProps } from '@/lib/types'
import { workExperienceSchema, WorkExperienceValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import { useMemo, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  })

  const debouncedSave = useMemo(
    () =>
      debounce(async (values, trigger, setData) => {
        const isValid = await trigger()
        if (isValid) {
          setData((prevData: any) => ({ ...prevData, ...values }))
        }
      }, 500), // 500ms delay
    [] // Empty dependency array means this is created only once
  )

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      debouncedSave(values, form.trigger, setResumeData)

      // Filter out any undefined work experiences
      // This ensures that only valid work experiences are saved
      setResumeData({
        ...resumeData,
        workExperiences: values.workExperiences?.filter(
          (exp) => exp !== undefined
        ),
      })
    })

    return () => unsubscribe()
  }, [form, debouncedSave, setResumeData, resumeData])

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'workExperiences',
  })

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">
          Share your work experience. Add as many as you like.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field) => (
            <WorkExperienceItem key={field.id} />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })
              }
            >Add Work Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

function WorkExperienceItem() {
  return <div>Work experience Item</div>
}
