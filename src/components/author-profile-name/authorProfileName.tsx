import { styles } from '~/components/author-profile-name/authorProfileName.styles'
import { Typography, Box, Rating } from '@mui/material'
import { FC } from 'react'

import { props } from './mockValues'

interface ProfileName {
  name: string
}

const authorProfileName: FC<ProfileName> = ({ name } = props) => {
  return (
    <Typography sx={styles.name} variant='body2'>
      {name}
    </Typography>
  )
}
export default authorProfileName
