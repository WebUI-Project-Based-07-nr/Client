import React from 'react'
import * as Icons from '@mui/icons-material'

type IconResolverProps = {
  iconName: keyof typeof Icons
  [key: string]: unknown
}

const IconResolver: React.FC<IconResolverProps> = ({ iconName, ...props }) => {
  const IconComponent = Icons[iconName]

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found`)
    return null
  }

  return <IconComponent {...props} />
}

export default IconResolver
