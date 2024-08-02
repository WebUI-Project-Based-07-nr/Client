import * as React from 'react'
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import { Box } from '@mui/material'

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState<string | null>('left')

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup
      aria-label='text alignment'
      exclusive
      onChange={handleAlignment}
      value={alignment}
    >
      <Box display='flex' gap='5px'>
        <ToggleButton
          aria-label='left aligned'
          sx={{
            '&.Mui-selected': {
              border: '1px solid black'
            }
          }}
          value='left'
        >
          <FormatListBulletedOutlinedIcon />
        </ToggleButton>
        <ToggleButton
          aria-label='right aligned'
          sx={{
            '&.Mui-selected': {
              border: '1px solid black'
            }
          }}
          value='right'
        >
          <GridViewOutlinedIcon />
        </ToggleButton>
      </Box>
    </ToggleButtonGroup>
  )
}
