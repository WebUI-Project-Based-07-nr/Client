import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { createUrlPath } from '~/utils/helper-functions'
import {
  GetUsersParams,
  UpdateUserParams,
  UserImageResponse,
  UserResponse,
  UserRole,
  File
} from '~/types'

export const userService = {
  getUsers: async (
    params: GetUsersParams
  ): Promise<AxiosResponse<UserResponse[]>> => {
    return await axiosClient.get(URLs.users.get, { params })
  },
  getUserImage: async (): Promise<AxiosResponse<UserImageResponse>> => {
    return await axiosClient.get(URLs.users.getImage)
  },
  getUserById: (
    userId: string,
    userRole: UserRole
  ): Promise<AxiosResponse<UserResponse>> => {
    return axiosClient.get(
      createUrlPath(URLs.users.get, userId, { role: userRole })
    )
  },
  updateUser: (
    userId: string,
    params: UpdateUserParams
  ): Promise<AxiosResponse<null>> => {
    return axiosClient.patch(createUrlPath(URLs.users.update, userId), params)
  },
  deleteUser: (userId: string): Promise<AxiosResponse<null>> => {
    return axiosClient.delete(createUrlPath(URLs.users.get, userId))
  },
  deleteUsers: (userIds: string): Promise<AxiosResponse<null>> => {
    return axiosClient.post(URLs.users.delete, userIds)
  },
  uploadPhoto: async (file: File | null): Promise<AxiosResponse<null>> => {
    const formData = new FormData()
    formData.append('file', file)

    return axiosClient.post(URLs.users.myImage, formData)
  }
}
