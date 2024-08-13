import { AxiosResponse } from 'axios'
import { SortEnum } from '../common.index'
import { Answer } from '~/types/questions/questions.index'

export type Address = {
  country: string
  city: string
}

export type CreatedAt = {
  from: string
  to: string
}

export type LastLogin = {
  from: string
  to: string
}

export type Sort = {
  order: SortEnum
  orderBy: string
}

export type Media = {
  name: string
  path: string
}

export type File = {
  name: string
  url: string
  size: string
  createdAt: string
}

export type Link = {
  name: string
  url: string
}

export type Lesson = {
  title: string
  category: {
    name: string
  }
  updatedAt: string
}

export interface DefaultResponse {
  attachments: []
  author: string
  createdAt: string
  description: string
  title: string
  updatedAt: string
  _id: string
  content: string
  category: null
}

export type LessonData = {
  service: Promise<AxiosResponse>
  fetchOnMount: boolean
  defaultResponse: DefaultResponse
  onResponse: boolean
  onResponseError: boolean
}

export type Attachment = {
  _id: string
  size: string
  title: string
  fileName: string
  text: string
  answers: Answer[]
  author: string
  type: string
  category: string
  createdAt: CreatedAt
  updatedAt: string
}

export type resource = {
  _id: string
}

export type CourseResources = {
  resources: Array<resource>
}

export type item = {
  title?: string
  fileName?: string
  category: {
    _id: string
  }
}

export type accordionItem = {
  title: string
  description: string
}
