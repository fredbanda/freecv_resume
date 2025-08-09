import { ResumeValues } from '@/lib/validation'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import useDimentions from '@/hooks/useDimensions'
import Image from 'next/image'
import { formatDate } from 'date-fns'
import { Badge } from './ui/badge'

interface ResumePreviewProps {
  resumeData: ResumeValues
  className?: string
}

export default function ResumePreview({
  resumeData,
  className,
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { width } = useDimentions(containerRef as React.RefObject<HTMLElement>)
  return (
    <div
      className={cn(
        'bg-white text-black h-fit w-full aspect-[210/297]',
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn('space-y-6 p-6', !width && 'invisible')}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <PersonalInfoHeader resumeData={resumeData} />
        <SummarySection resumeData={resumeData} />
        <WorkExperienceSection resumeData={resumeData} />
        <SkillsSection resumeData={resumeData} />
        <EducationSection resumeData={resumeData} />
      </div>
    </div>
  )
}

interface ResumeSectionProps {
  resumeData: ResumeValues
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
  const {
    photo,
    firstName,
    lastName,
    jobTitle,
    streetAddress,
    location,
    city,
    phone,
    email,
    country,
  } = resumeData

  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? '' : photo)

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : ''
    if (objectUrl) setPhotoSrc(objectUrl)
    if (photo == null) setPhotoSrc('')

    return () => URL.revokeObjectURL(objectUrl)
  }, [photo])

  return (
    <div className="flex items-center gap-6">
      {photoSrc && (
        <Image
          src={photoSrc}
          width={100}
          height={100}
          alt="Author Photo"
          className="aspect-square object-cover"
        />
      )}
      <div className="space-y-2.5">
        <div className="space-y-1">
          <p className="text-3xl font-bold">
            {firstName} {lastName}
          </p>
          {jobTitle && <p className="font-medium">{jobTitle}</p>}
        </div>

        <p className="text-sm text-gray-500">
          {[streetAddress, location, city, country].filter(Boolean).join(', ')}
          {(streetAddress || location || city || country) &&
            (phone || email) &&
            ' • '}
          {[phone, email].filter(Boolean).join(' • ')}
        </p>
      </div>
    </div>
  )
}

function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary } = resumeData

  if (!summary) return null

  return (
    <>
      <hr className="boder-2" />
      <div className="space-y-3 break-inside-avoid">
        <p className="text-lg font-semibold">Professional Summary</p>
        <div className="whitespace-pre-line text-sm mt-[-10px]">{summary}</div>
      </div>
    </>
  )
}

function WorkExperienceSection({resumeData}:ResumeSectionProps){
  const {workExperiences} = resumeData;

  const workExperiencesNotEmpty = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0
  )

  if (!workExperiencesNotEmpty?.length) return null;

  return (
  <>
  <hr className='border-2' />
  <div className="space-y-3">
    <p className="text-lg font-bold mt-[-10px]">Work Experience</p>
    {workExperiencesNotEmpty.map((exp, index) => (
      <div key={index} className="break-inside-avoid space-y-1">
        <div className="flex items-center justify-between text-sm-font-semibold">
            <span className="font-bold mt-[-10px]">{exp.position}</span>
             <p className="text-xs font-bold mt-[-10px]">{exp.company} </p>
            {exp.startDate && (
              <span className='font-bold'> 
                {formatDate(exp.startDate, "MM/yyyy")} - {" "}
                {exp.endDate ? formatDate(exp.endDate, "MM/yyyy"): "present"}
              </span>
            )}
        </div>
        <div className="whitespace-pre-line text-xs">{exp.description} </div>
      </div>
    ))}
  </div>
  </>
  )
}

function EducationSection({resumeData}: ResumePreviewProps){
  const {educations} = resumeData;


  const educationsNotEmpty = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0
  )

  if(!educationsNotEmpty?.length ) return null

  return (
  <>
  <hr className='border-2' />
  <div className="space-y-3">
    <p className="text-lg font-bold mt-[-10px]">Education</p>
    {educationsNotEmpty.map((edu, index) => (
      <div key={index} className="break-inside-avoid space-y-1">
        <div className="flex items-center justify-between text-sm-font-semibold">
            <span className="font-bold mt-[-10px]">{edu.qualification}</span>
            {edu.startDate && (
              <span className='font-bold'> 
              {edu.startDate && 
              `${formatDate(edu.startDate, "MM/yyyy")} ${edu.endDate ? ` - ${formatDate(edu.endDate, "MM/yyyy")}` : ""}`
              }
              </span>
            )}
        </div>
        <p className="text-xs font-bold mt-[-10px]">{edu.institution} </p>
        <div className="whitespace-pre-line text-xs">{edu.location} </div>
        <p>{edu.grade}</p>
      </div>
    ))}
  </div>
  </>
  )
}

function SkillsSection({resumeData}: ResumePreviewProps){
  const {skills} = resumeData;


  if (!skills?.length) return null;

  return (
    <>
    <hr className='border-2' />

    <p className="break-inside-avoid space-y-3">Skills</p>
    <div className="flex break-inside-avoid flex-wrap gap-2 mt-[-10px]">
      {skills.map((skill, index) => (
        <Badge key={index} className='bg-black text-white rounded-md'>
          {skill}
        </Badge>
      ))}
    </div>
    </>
  )
}