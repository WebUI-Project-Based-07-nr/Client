import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

import { Countries, Cities, GetCitiesParams, ItemsWithCount } from '~/types'

export const LocationService = {
  getCountries: (): Promise<AxiosResponse<ItemsWithCount<Countries>>> => {
    return axiosClient.get(URLs.location.countries.get)
  },
  getCities: (
    params: GetCitiesParams
  ): Promise<AxiosResponse<ItemsWithCount<Cities>>> => {
    return axiosClient.get(URLs.location.cities.get, { params })
  }
}
