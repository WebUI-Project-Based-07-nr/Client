import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import star from '~/assets/star.svg'
import { Box, Typography } from '@mui/material'
import { styles } from './RatingRadioGroup.styles'

export default function ControlledRadioButtonsGroup() {
  const [value, setValue] = React.useState('0')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  const labelContent = (text: string) => {
    return (
      <Typography>
        <img alt='star' src={star} />
        {text}
      </Typography>
    )
  }

  return (
    <Box>
      <Typography sx={styles.textLabel}>Rating</Typography>
      <FormControl sx={{ mb: '50px' }}>
        <RadioGroup
          aria-labelledby='demo-controlled-radio-buttons-group'
          name='controlled-radio-buttons-group'
          onChange={handleChange}
          value={value}
        >
          <FormControlLabel control={<Radio />} label='Any rating' value='0' />
          <FormControlLabel
            control={<Radio />}
            label={labelContent('5 stars')}
            value='5'
          />
          <FormControlLabel
            control={<Radio />}
            label={labelContent('4 and above')}
            value='4'
          />
          <FormControlLabel
            control={<Radio />}
            label={labelContent('3 and above')}
            value='3'
          />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}
