import { FC, ReactElement } from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Badge from '@mui/material/Badge'
import { Link } from 'react-router-dom'

interface NavigationIconProps {
  tooltip: string
  icon: ReactElement
  buttonProps: IconButtonProps
  badgeContent?: number
  to?: string
}

const NavigationIcon: FC<NavigationIconProps> = ({
  tooltip,
  icon,
  buttonProps,
  badgeContent = 0,
  to
}) => {
  const content = (
    <Tooltip arrow title={tooltip}>
      <IconButton {...buttonProps}>
        <Badge badgeContent={badgeContent} color={'error'}>
          {icon}
        </Badge>
      </IconButton>
    </Tooltip>
  )

  return to ? <Link to={to}>{content}</Link> : content
}

export default NavigationIcon
