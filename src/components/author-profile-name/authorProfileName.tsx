import { styles } from '~/components/author-profile-name/authorProfileName.styles'
import { Typography } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router'

import { props } from './mockValues'

interface ProfileName {
  name?: string
}

const AuthorProfileName: FC<ProfileName> = ({ name = props.name }) => {
  const navigate = useNavigate()
  const openProfile = () => {
    navigate('/')
  }
  return (
    <Typography onClick={openProfile} sx={styles.name} variant='body2'>
      {name}
    </Typography>
  )
}
export default AuthorProfileName
