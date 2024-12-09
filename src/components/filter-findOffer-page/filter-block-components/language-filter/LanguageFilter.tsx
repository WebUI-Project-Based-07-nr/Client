import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { styles } from './LanguageFilter.styles'
interface stateType {
  language: string
  isNativeSpeacker: boolean
}

export default function LanguageFilter() {
  const [state, setState] = React.useState<stateType>({
    language: 'Any language',
    isNativeSpeacker: false
  })
  const [open, setOpen] = React.useState(false)

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setState({
      ...state,
      language: event.target.value
    })
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      isNativeSpeacker: event.target.checked
    })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Box>
      <Typography sx={styles.text}>Language</Typography>
      <Box>
        <Button onClick={handleOpen} sx={{ display: 'block', mt: 2 }} />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            id='demo-controlled-open-select'
            labelId='demo-controlled-open-select-label'
            onChange={handleLanguageChange}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            value={state.language}
          >
            <MenuItem value='Any language'>Any language</MenuItem>
            <MenuItem value='Ukrainian'>Ukrainian</MenuItem>
            <MenuItem value='English'>English</MenuItem>
            <MenuItem value='Polish'>Polish</MenuItem>
            <MenuItem value='German'>German</MenuItem>
            <MenuItem value='French'>French</MenuItem>
            <MenuItem value='Spanish'>Spanish</MenuItem>
            <MenuItem value='Arabic'>Arabic</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Checkbox
          checked={state.isNativeSpeacker}
          inputProps={{ 'aria-label': 'controlled' }}
          onChange={handleChange}
        />
      </Box>
    </Box>
  )
}
