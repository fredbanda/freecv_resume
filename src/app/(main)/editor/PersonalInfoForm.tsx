import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


export default function PersonalInfoForm() {
    const form = useForm<PersonalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            //photo: undefined,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            jobTitle: '',
            city: '',
            country: '',
        }
    })

useEffect(() => {
  let isMounted = true;
  
  const subscription = form.watch(async () => {
    if (!isMounted) return;
    
    try {
      const isValid = await form.trigger();
      
      if (!isMounted) return;
      
      if (isValid) {
        console.log("Form is valid");
      } else {
        console.log("Form is invalid");
      }
    } catch (error) {
      console.error("Validation error:", error);
    }
  });

  return () => {
    isMounted = false;
    subscription.unsubscribe(); // Call unsubscribe() method on the subscription
  };
}, []);

  return (
    <>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          <p className="text-sm text-muted-foreground">
            It all starts here. Provide your personal information and please be thorough.
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="photo"
              render={({ field: {value, ...fieldValues} }) => (
                <FormItem>
                  <FormLabel>Your photo (optional)</FormLabel>
                  <FormControl>
                    <Input {...fieldValues} 
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                        fieldValues.onBlur();
                    }}
                    placeholder="Your Photo here (optional)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="firstName"
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
            </form>
        </Form>
      </div>
    </>
  );
}