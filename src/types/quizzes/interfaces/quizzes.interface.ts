import {
  Category,
  CommonEntityFields,
  CreateOrEditQuestionForm,
  Question
} from '~/types'

export interface Quiz extends CommonEntityFields {
  title: string
  description: string
  items: Question[]
  category: Category | null
}

export interface CreateQuizParams {
  title: string
  description: string
  items: CreateOrEditQuestionForm[]
  category: string
}

export interface UpdateQuizParams extends Omit<CreateQuizParams, 'items'> {
  id: string
  items: Question[]
}
