import { styles } from '~/components/author-profile-picture/AuthorProfilePicture.styles'
import { Avatar } from '@mui/material'
import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { userService } from '~/services/user-service'
import {
  ErrorResponse,
  GetUsersParams,
  UserResponse,
  UserRoleEnum
} from '~/types'
import { useSnackBarContext } from '~/context/snackbar-context'
import { snackbarVariants } from '~/constants'
import useAxios from '~/hooks/use-axios'

interface ProfileAvatar {
  authorId: string
}

const defaultUserResponse: UserResponse = {
  _id: '',
  role: [],
  firstName: '',
  lastName: '',
  email: '',
  mainSubjects: [],
  totalReviews: { student: 0, tutor: 0 },
  averageRating: { student: 0, tutor: 0 },
  nativeLanguage: '',
  address: { country: '', city: '' },
  professionalSummary: '',
  photo: '',
  lastLogin: '',
  createdAt: '',
  updatedAt: '',
  FAQ: { student: [], tutor: [] }
}

const AuthorProfilePicture: FC<ProfileAvatar> = ({ authorId }) => {
  const { setAlert } = useSnackBarContext()
  const navigate = useNavigate()

  const openProfile = () => {
    navigate('/')
  }

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getOfferService = useCallback(() => {
    return userService.getUserById(authorId, UserRoleEnum.Admin)
  }, [authorId])

  const { response, loading } = useAxios<UserResponse, GetUsersParams>({
    service: getOfferService,
    defaultResponse: defaultUserResponse,
    onResponseError
  })

  const placeholderImage =
    'https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg'

  const userPhoto = response?.photo ?? placeholderImage

  return (
    <Avatar
      alt='User'
      onClick={openProfile}
      src={!loading ? userPhoto : placeholderImage}
      sx={styles.avatarImg}
    />
  )
}

export default AuthorProfilePicture
