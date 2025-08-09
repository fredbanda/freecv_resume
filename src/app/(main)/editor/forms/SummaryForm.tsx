/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { summarySchema, SummaryValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";


export default function SummaryForm({resumeData, setResumeData}: EditorFormProps) {
    const form = useForm<SummaryValues>({
        resolver: zodResolver(summarySchema),
        defaultValues: {
            summary: resumeData.summary || "",
        },
    })

const debouncedSave = useMemo(
  () =>
    debounce(async (values, trigger, setData) => {
      const isValid = await trigger();
      if (isValid) {
        setData((prev: any) => ({ ...prev, ...values }));
      }
    }, 500),
  []
);

useEffect(() => {
  const subscription = form.watch((values) => {
    debouncedSave(values, form.trigger, setResumeData);
  });

  return () => subscription.unsubscribe();
}, [form, debouncedSave, setResumeData]);



    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="font-semibold tet-2xl">Professional Summary</h2>
                <p className="text-sm text-muted-forground italic">
                    Write a short introduction for your CV/Resume or generate using our AI helper
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <FormField 
                    control={form.control}
                    name="summary"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Your career or professional summary</FormLabel>
                            <FormControl>
                            <Textarea {...field } 
                            placeholder="Be engaging powerful but short and sweet"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </form>
            </Form>
        </div>
    );
}
