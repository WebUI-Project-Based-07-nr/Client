import { ButtonProps } from '@mui/material/Button'

import {
  ProficiencyLevelEnum,
  CommonEntityFields,
  UserResponse,
  SubjectNameInterface,
  LanguagesEnum,
  Faq,
  UserRoleEnum,
  CategoryInterface,
  StatusEnum,
  RequestParams,
  CategoryNameInterface,
  Answer,
  CreateOrEditQuestionForm
} from '~/types'

export interface Offer extends CommonEntityFields {
  title: string
  price: number
  proficiencyLevel: ProficiencyLevelEnum
  description: string
  languages: LanguagesEnum[]
  authorRole: UserRoleEnum.Tutor | UserRoleEnum.Student
  author: Pick<
    UserResponse,
    | '_id'
    | 'totalReviews'
    | 'photo'
    | 'professionalSummary'
    | 'firstName'
    | 'lastName'
    | 'FAQ'
    | 'averageRating'
  >
  subject?: SubjectNameInterface
  category?: CategoryInterface
  FAQ: Faq[]
  status: StatusEnum
}

export interface ButtonActions {
  label: string
  buttonProps?: ButtonProps<'button', { to?: string }>
}

export interface PriceRangeParams {
  authorRole: UserRoleEnum
  categoryId?: string
  subjectId?: string
}

export interface PriceRangeResponse {
  minPrice: number
  maxPrice: number
}

export interface GetOffersResponse {
  items: Offer[]
  count: number
}

export interface GetOfferParams extends Partial<RequestParams> {
  title?: string
  fileName?: string
}

export interface GetOffer extends Omit<Offer, 'category'> {
  category: string | null
}

export interface OfferForm
  extends Omit<Offer, 'author' | 'category' | keyof CommonEntityFields> {
  openAnswer?: string
  category: string | CategoryNameInterface | null
  answers: OfferFormAnswer[]
}

export interface CreateOfferData extends Omit<OfferForm, 'answers'> {
  answers: Answer[]
}

export interface OfferFormAnswer extends Offer {
  id: number
}

export interface UpdateOfferParams {
  title: Offer['title']
  id: Offer['_id']
  price: Offer['price']
  category: CategoryNameInterface | string | null
  languages: Offer['languages']
  status: Offer['status']
  subject: Offer['subject']
}

export interface CreateOfferParams {
  title: string
  description: string
  items: CreateOrEditQuestionForm[]
  category: string
}
