import React from "react"
import GeneralInfoForm from "./forms/GeneralInfoForm"
import { EditorFormProps } from "@/lib/types"

export const steps: {
  title: string
  component: React.ComponentType<EditorFormProps>
  key: string
}[] = [
  {
    title: 'General Info',
    component: GeneralInfoForm,
    key: 'general-info',
  },
    {
        title: 'Personal Info',
        component: React.lazy(() => import('./forms/PersonalInfoForm')),
        key: 'personal-info',
    },

    {title: 'Work Experience',
        component: React.lazy(() => import('./forms/WorkExperienceForm')),
        key: 'work-experience',
      },
    {
      title: 'Education',
      component: React.lazy(() => import('./forms/EducationForm')),
      key: 'education',
    },
    {
      title: 'Skills',
      component: React.lazy(() => import('./forms/SkillsForm')),
      key: 'skills',
    }
]
