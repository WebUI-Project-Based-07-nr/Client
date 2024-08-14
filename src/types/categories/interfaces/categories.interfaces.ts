import { CommonEntityFields } from '~/types/common/common.index'
import { TableColumn } from '~/types/components/components.index'
import { Categories } from '~/types/my-resources/myResources.index'
import { Offer } from '~/types/offer/offer.index'
import { Question } from '~/types/questions/questions.index'
import { RequestParams } from '~/types/services/types/services.types'

export interface CategoriesParams extends RequestParams {
  name: string
}

export interface Category extends CommonEntityFields {
  name: string
  appearance: {
    icon: string
    color: string
  }
  offers: Offer[]
  totalOffers: number
}

export interface CreateCategoriesParams {
  name: Categories['name']
  icon: string
  color: string
}

export interface ScreenBasedLimits {
  desktop?: number
  laptopAndDesktop?: number
  laptop?: number
  tablet: number
  mobile: number
  default: number
}

export interface RemoveColumnRules<T extends Question | Categories> {
  desktop?: TableColumn<T>['label'][]
  tablet?: TableColumn<T>['label'][]
  mobile?: TableColumn<T>['label'][]
}
