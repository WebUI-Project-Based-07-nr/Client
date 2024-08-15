import React, { useState } from 'react'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { styles } from './PriceSlider.styles'

const CustomSlider = styled(Slider)({
  '& .MuiSlider-thumb': {
    width: 24,
    height: 24,
    backgroundColor: '#455A64',
    borderRadius: '50%',
    zIndex: 1
  },
  '& .MuiSlider-valueLabel': {
    position: 'relative',
    transform: 'translateY(150%) ! important',
    backgroundColor: '#11ffee00',
    color: '#455A64',
    zIndex: 2
  },
  '& .MuiSlider-track': { height: 4, backgroundColor: '#455A64', zIndex: 1 },
  '& .MuiSlider-rail': {
    height: 4,
    opacity: 1,
    backgroundColor: '#ccc',
    position: 'relative',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      width: 24,
      height: 24,
      backgroundColor: '#ccc',
      borderRadius: '50%',
      transform: 'translateY(-50% )',
      zIndex: 1
    },
    '&::before': { left: -12 },
    '&::after': { right: -12 }
  }
})
const PriceSlider: React.FC = () => {
  const [value, setValue] = useState<[number, number]>([150, 150])
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as [number, number])
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = event.target.name === 'min' ? 0 : 1
    const newValue = [...value]
    newValue[index] =
      event.target.value === '' ? value[index] : Number(event.target.value)
    setValue(newValue as [number, number])
  }
  const handleBlur = () => {
    if (value[0] < 150) {
      setValue([150, value[1]])
    } else if (value[1] > 3500) {
      setValue([value[0], 3500])
    }
  }
  return (
    <Box sx={{ mr: '50px' }}>
      <Typography sx={styles.text}> Price </Typography>
      <CustomSlider
        aria-labelledby='price-slider'
        max={3500}
        min={150}
        onChange={handleSliderChange}
        value={value}
        valueLabelDisplay='on'
      />{' '}
      <Box
        sx={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2
        }}
      >
        <Box>
          <Typography>From</Typography>
          <TextField
            inputProps={{ step: 10, min: 150, max: 3500, type: 'number' }}
            name='min'
            onBlur={handleBlur}
            onChange={handleInputChange}
            value={value[0]}
          />{' '}
        </Box>
        <Box>
          <Typography>To</Typography>
          <TextField
            inputProps={{ step: 10, min: 150, max: 3500, type: 'number' }}
            name='max'
            onBlur={handleBlur}
            onChange={handleInputChange}
            value={value[1]}
          />{' '}
        </Box>
      </Box>{' '}
    </Box>
  )
}
export default PriceSlider
