import { styles } from '~/components/author-profile-name/authorProfileName.styles'
import { Typography } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router'

import { props } from './mockValues'

interface ProfileName {
  name?: string
}

const AuthorProfileName: FC<ProfileName> = ({ name = props.name } ) => {
  const navigate = useNavigate()
  const openProfile = () => {
    navigate('/')
  }
  return (
    <Typography sx={styles.name} onClick={ openProfile } variant='body2'>
      {name}
    </Typography>
  )
}
export default AuthorProfileName
