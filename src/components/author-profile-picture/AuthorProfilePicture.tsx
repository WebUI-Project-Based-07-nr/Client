import { styles } from '~/components/author-profile-picture/AuthorProfilePicture.styles'
import { Avatar } from '@mui/material'
import { FC } from 'react'

import temp from './temp.svg'

interface ProfileAvatar {
  profileAvatar: string
}

const AuthorProfilePicture: FC<ProfileAvatar> = ({ profileAvatar = temp }) => {
  return <Avatar alt='User' src={profileAvatar} sx={styles.avatarImg} />
}
export default AuthorProfilePicture
