/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { personalInfoSchema, PersonalInfoValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { debounce } from 'lodash'
import { EditorFormProps } from '@/lib/types'

export default function PersonalInfoForm({resumeData, setResumeData}: EditorFormProps) {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      //photo: undefined,
      firstName: resumeData.firstName || '',
      lastName: resumeData.lastName || '',
      email: resumeData.email || '',
      phone: resumeData.phone || '',
      jobTitle: resumeData.jobTitle || '',
      streetAddress: resumeData.streetAddress || '',
      location: resumeData.location || '',
      city: resumeData.city || '',
      country: resumeData.country || '',

    },
  })

const debouncedSave = useMemo(
  () =>
    debounce(async (values, trigger, setData) => {
      const isValid = await trigger();
      if (isValid) {
        setData((prevData: any) => ({ ...prevData, ...values }));
      }
    }, 500), // 500ms delay
  [] // Empty dependency array means this is created only once
);

useEffect(() => {
  const { unsubscribe } = form.watch(values => {
    debouncedSave(values, form.trigger, setResumeData);
  });

  return () => unsubscribe();
}, [form, debouncedSave, setResumeData]);
  return (
    <>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          <p className="text-sm text-muted-foreground">
            It all starts here. Provide your personal information and please be
            thorough.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Your photo (optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        fieldValues.onChange(file)
                        fieldValues.onBlur()
                      }}
                      placeholder="Your Photo here (optional)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Sibusiso" autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Zulu" autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Senior Marketing Assistant"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} 
                      type='tel'
                      placeholder="e.g. 0814402910" autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. sibzulu@gmail.com" autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Home Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. 123 Mbokodo Street" autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Home Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Soweto" autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City you live In</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Pretoria" autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country You Live In</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. South Africa" autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
