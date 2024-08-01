import { styles } from '~/components/author-profile-picture/AuthorProfilePicture.styles'
import { Avatar } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router'

import temp from './temp.svg'

interface ProfileAvatar {
  profileAvatar?: string
}

const AuthorProfilePicture: FC<ProfileAvatar> = ({ profileAvatar = temp }) => {
  const navigate = useNavigate()
  const openProfile = () => {
    navigate('/')
  }

  return <Avatar alt='User' src={profileAvatar} sx={styles.avatarImg} onClick={openProfile}/>
}
export default AuthorProfilePicture
