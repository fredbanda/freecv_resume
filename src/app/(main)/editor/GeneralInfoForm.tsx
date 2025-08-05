import { generalInfoSchema, GeneralInfoValues } from '@/lib/validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

export default function GeneralInfoForm() {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })
  return (
    <>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">General Information</h2>
          <p className="text-sm text-muted-foreground">
            Provide general information about your resume or CV.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume or CV Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. Sibusiso Zulu" autoFocus />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="My resume or CV for my next job"  />
                  </FormControl>
                  <FormDescription>Describe your resume or CV in a few sentences.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </>
  )
}
