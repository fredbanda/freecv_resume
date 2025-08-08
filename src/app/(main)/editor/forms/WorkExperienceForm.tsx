/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
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
import { workExperienceSchema, WorkExperienceValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import {  GripHorizontal } from 'lucide-react'
import { useMemo, useEffect } from 'react'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'

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

  const { fields, append, remove } = useFieldArray({
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
          {fields.map((field, index) => (
            <WorkExperienceItem
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
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })
              }
            >
              Add Work Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

interface WorkExperienceItemProps {
  form: UseFormReturn<WorkExperienceValues>
  index: number
  remove: (index: number) => void
}

function WorkExperienceItem({ form, index, remove }: WorkExperienceItemProps) {
  // Here you would implement the UI
  return (
    <div className="space-y-3 border rounded-md bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work Experience {index + 1}</span>
        <GripHorizontal className="text-muted-foreground cursor-move size-5" />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
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
          name={`workExperiences.${index}.endDate`}
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
      <FormDescription className="text-sm text-muted-foreground mt-[-10px] italic text-end mb-4">
        If you are currently working here, leave the end date empty.
      </FormDescription>

      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>List All The Tasks/Duties You Performed</FormLabel>
            <FormControl>
              <Textarea {...field}  />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormDescription className="text-sm text-muted-foreground mt-[-10px] italic mb-4">
        For better CV/Resume strength, try to use action words like Managed a team of 5, Developed a new feature, etc.
      </FormDescription>

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
