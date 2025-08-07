/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { educationSchema, EducationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { GripHorizontal } from "lucide-react";

export default function EducationForm({resumeData, setResumeData}: EditorFormProps) {
    const form = useForm<EducationValues>({
        resolver: zodResolver(educationSchema),
        defaultValues: {
            educations: resumeData.educations || [],
        }
    });

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
            workExperiences: values.educations?.filter(
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
    <div>
      
    </div>
  )
}

interface EducationItemProps {
  form: UseFormReturn<EducationValues>
  index: number
  remove: (index: number) => void
}

function EducationItem({ form, index, remove }: EducationItemProps){
    return (
        <div className="space-y-3 border rounded-md bg-background p-3">
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work Experience {index + 1}</span>
        <GripHorizontal className="text-muted-foreground cursor-move size-5" />
      </div>
      </div>
        
    );
}
