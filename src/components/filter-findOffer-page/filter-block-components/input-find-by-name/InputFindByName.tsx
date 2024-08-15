import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import InputAdornment from '@mui/material/InputAdornment'
import { Typography } from '@mui/material'
import { styles } from './InputFindByName.styles'

export default function InputFindByName() {
  const [name, setName] = React.useState('')

  return (
    <Box>
      <Typography sx={styles.text}>Search by tutor name</Typography>
      <Box
        autoComplete='off'
        component='form'
        noValidate
        sx={{
          '& > :not(style)': { mr: '50px', width: '25ch' }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <SearchRoundedIcon />
                </InputAdornment>
              )
            }}
            id='outlined-basic'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value)
            }}
            placeholder='Esther Howard'
            value={name}
            variant='outlined'
          ></TextField>
        </Box>
      </Box>
    </Box>
  )
}
