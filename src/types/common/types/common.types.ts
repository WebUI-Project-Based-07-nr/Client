import { SortEnum } from '../common.index'

export type Address = {
  country: string
  city: string
}

export type Category = {
  _id: string
  name: string
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
