import { z } from 'zod'

export const optionalString = z.string().trim().optional().or(z.literal(''))

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
})

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith('image/')),
      'Please upload a valid image file'
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024,
      'File size must be less than 1MB'
    ),

  firstName: optionalString,
  lastName: optionalString,
  email: optionalString,
  phone: optionalString,
  jobTitle: optionalString,
  streetAddress: optionalString,
  location: optionalString,
  city: optionalString,
  country: optionalString,
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>

export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        company: optionalString,
        position: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        description: optionalString,
      })
    )
    .optional(),
})

export const educationSchema = z.object({
  educations: z.array(
    z.object({
      institution: optionalString,
      qualification: optionalString,
      location: optionalString,
      startDate: optionalString,
      endDate: optionalString,
      grade: optionalString,
    })
  ),
})

export const skillsSchema = z.object({
  skills: z.array(z.string()).optional(),
})

export const summarySchema = z.object({
  summary: z.string().trim().optional(),
})

export const jobOpportunitySchema = z.object({
  jobOpportunities: z.array(
    z.object({
      title: optionalString,
      location: optionalString,
      company: optionalString,
      datePosted: optionalString,
      jobType: optionalString,
      workMode: optionalString,
      salary: optionalString,
      categories: optionalString,
      benefits: optionalString,
      aboutThisJob: optionalString,
      requirements: optionalString,
      responsibilities: optionalString,
    })
  ),
})

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  ...jobOpportunitySchema.shape,
})

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>
export type EducationValues = z.infer<typeof educationSchema>
export type SkillsValues = z.infer<typeof skillsSchema>
export type SummaryValues = z.infer<typeof summarySchema>
export type JobOpportunityValues = z.infer<typeof jobOpportunitySchema>

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, 'photo'> & {
  // Add any additional fields that are part of the resume
  id?: string
  photo?: File | string | null
}
