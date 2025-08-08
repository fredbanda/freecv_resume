/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EditorFormProps } from '@/lib/types'
import { educationSchema, EducationValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import { useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { GripHorizontal } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

export default function EducationForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
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
        educations: (values.educations ?? []).filter(
          (exp) => exp !== undefined
        ),
      })
    })

    return () => unsubscribe()
  }, [form, debouncedSave, setResumeData, resumeData])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  })

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add your education: degrees and certifications you have accumulated
          over the time.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <EducationItem
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  qualification: '',
                  institution: '',
                  startDate: '',
                  endDate: '',
                  fieldOfStudy: '',
                  description: '',
                })
              }
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

interface EducationItemProps {
  form: UseFormReturn<EducationValues>
  index: number
  remove: (index: number) => void
}

function EducationItem({ form, index, remove }: EducationItemProps) {
  return (
    <div className="space-y-3 border rounded-md bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Education {index + 1}</span>
        <GripHorizontal className="text-muted-foreground cursor-move size-5" />
      </div>
      <FormField
        control={form.control}
        name={`educations.${index}.qualification`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your Qualification</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.institution`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>School you attended</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`educations.${index}.fieldOfStudy`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>What did you study?</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormDescription className="text-sm text-muted-foreground italic text-end mt-[-10px] mb-4">
        Leave end date empty if you are still studying here
      </FormDescription>
      <FormField
        control={form.control}
        name={`educations.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Describe your grades (optional)</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        variant="destructive"
        size="sm"
        onClick={() => remove(index)}
        className="w-full mt-2"
      >
        Remove Work Experience
      </Button>
    </div>
  )
}
