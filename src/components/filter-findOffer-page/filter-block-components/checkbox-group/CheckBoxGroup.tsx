import * as React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { styles } from './CheckBoxGroup.styles'
import { Typography } from '@mui/material'

export default function CheckboxGroup() {
  const [state, setState] = React.useState({
    beginner: true,
    intermediate: false,
    advanced: false,
    testPreparation: false,
    professional: false,
    specialized: false
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    })
  }

  const {
    beginner,
    intermediate,
    advanced,
    testPreparation,
    professional,
    specialized
  } = state

  return (
    <Box>
      <Typography sx={styles.text}>Levels</Typography>
      <FormControl component='fieldset' sx={{ mb: '50px' }} variant='standard'>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={beginner}
                name='beginner'
                onChange={handleChange}
              />
            }
            label='Beginner'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={intermediate}
                name='intermediate'
                onChange={handleChange}
              />
            }
            label='Intermediate'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={advanced}
                name='advanced'
                onChange={handleChange}
              />
            }
            label='Advanced'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={testPreparation}
                name='testPreparation'
                onChange={handleChange}
              />
            }
            label='Test Preparation'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={professional}
                name='professional'
                onChange={handleChange}
              />
            }
            label='Professional'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={specialized}
                name='specialized'
                onChange={handleChange}
              />
            }
            label='Specialized'
          />
        </FormGroup>
      </FormControl>
    </Box>
  )
}
