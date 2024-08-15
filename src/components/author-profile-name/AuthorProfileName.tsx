import { styles } from '~/components/author-profile-name/AuthorProfileName.styles'
import { Typography } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router'

interface Author {
  firstName: string
  lastName: string
}
interface ProfileName {
  author: Author
}

const AuthorProfileName: FC<ProfileName> = ({ author }) => {
  const navigate = useNavigate()
  const openProfile = () => {
    navigate('/')
  }
  const fullName = `${author.firstName} ${author.lastName[0]}.`

  return (
    <Typography onClick={openProfile} sx={styles.name} variant='body2'>
      {fullName}
    </Typography>
  )
}
export default AuthorProfileName
