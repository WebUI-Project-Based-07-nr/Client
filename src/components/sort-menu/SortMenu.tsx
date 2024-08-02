import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box, Typography } from '@mui/material'
interface ItemsProp {
  items: string[]
}
export default function SortMenu(items: ItemsProp) {
  const [sortBy, setSortBy] = React.useState(items.items[0])

  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value)
  }

  return (
    <Box>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Box alignItems='center' display='flex' gap='8px'>
          <Box>
            <Typography>Sort by:</Typography>
          </Box>
          <Box>
            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={handleChange}
              value={sortBy}
            >
              {items.items.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </FormControl>
    </Box>
  )
}
