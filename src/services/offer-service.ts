import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CreateOfferData,
  GetOffer,
  GetOfferParams,
  ItemsWithCount,
  Offer,
  UpdateOfferParams
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const OfferService = {
  getOffers: (
    params?: GetOfferParams
  ): Promise<AxiosResponse<ItemsWithCount<Offer>>> => {
    return axiosClient.get(URLs.offers.get, { params })
  },
  getOffer: async (id?: string): Promise<AxiosResponse<GetOffer>> =>
    await axiosClient.get(createUrlPath(URLs.offers.get, id)),

  createOffer: async (data?: CreateOfferData): Promise<AxiosResponse> => {
    return await axiosClient.post(URLs.offers.post, data)
  },
  updateOffer: async (params?: UpdateOfferParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.offers.patch, params?.id),
      params
    ),
  deleteOffer: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(createUrlPath(URLs.offers.delete, id))
}
