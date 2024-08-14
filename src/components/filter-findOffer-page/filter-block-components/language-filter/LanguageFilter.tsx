import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormGroup from '@mui/material/FormGroup'
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { styles } from './LanguageFilter.styles'
import FormControlLabel from '@mui/material/FormControlLabel'

interface stateType {
  language: string
  isNativeSpeacker: boolean
}

export default function LanguageFilter() {
  const [state, setState] = React.useState<stateType>({
    language: 'Any language',
    isNativeSpeacker: false
  })

  const [nativeSpeaker, setNativeSpeaker] = React.useState({
    nativeSpeakerVar: false
  })

  const handleChangeNativeSpeaker = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNativeSpeaker({
      ...nativeSpeaker,
      nativeSpeakerVar: event.target.checked
    })
  }

  const [open, setOpen] = React.useState(false)

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setState({
      ...state,
      language: event.target.value
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
        <FormControl sx={{ minWidth: '16%' }}>
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox onChange={handleChangeNativeSpeaker} name='Native speaker' />
            }
            label='Native speaker'
          />
        </FormGroup>
      </Box>
    </Box>
  )
}
