/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { EditorFormProps } from '@/lib/types'
import { skillsSchema, SkillsValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { debounce } from 'lodash'
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

export default function SkillsForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<SkillsValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills || [],
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
  const { unsubscribe } = form.watch((values: SkillsValues) => {
    debouncedSave(values, form.trigger, setResumeData);

    const cleanedSkills =
      values.skills
        ?.filter((skill): skill is string => typeof skill === 'string' && skill.trim() !== '')
        .map((skill) => skill.trim()) || [];

    setResumeData({
      ...resumeData,
      skills: cleanedSkills,
    });
  });

  return () => unsubscribe();
}, [form, debouncedSave, resumeData, setResumeData]);


  
  return <div className='max-w-xl mx-auto space-y-6'>
    <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">
            Add your skills to showcase your expertise
        </p>
    </div>
    <Form {...form}>
        <div className="space-y-3">
            <FormField 
            control={form.control}
            name="skills"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Add Your Skills</FormLabel>
                    <FormControl>
                        <Textarea 
                        placeholder='e.g. JavaScript, React, Node.js'
                        {...field}
                        onChange={(e) => {
                            const skills = e.target.value.split(",");
                            field.onChange(skills)
                        }}
                        className="resize-none h-24"
                        />
                    </FormControl>
                    <FormDescription className="text-sm text-muted-foreground italic mt-[-10px] mb-4">
                        Separate skills with commas (e.g. JavaScript, React, Node.js)
                    </FormDescription>
                </FormItem>
            )}
            />
        </div>
    </Form>
  </div>
}
