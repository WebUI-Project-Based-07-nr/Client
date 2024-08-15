import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import { styles } from './ShowAllFiltersButton.styles'
import { Box, Typography } from '@mui/material'
interface ShowAllFiltersButtonProps {
  showFilters: () => void
}
const ShowAllFiltersButton: React.FC<ShowAllFiltersButtonProps> = ({
  showFilters
}) => {
  return (
    <Box sx={styles.btnWrapper}>
      <Stack direction='row' spacing={1}>
        <IconButton
          aria-label='show-button '
          onClick={showFilters}
          sx={styles.iconButton}
        >
          <FilterListRoundedIcon sx={styles.btnLabel} />
        </IconButton>
      </Stack>
      <Typography sx={styles.text}>Filters</Typography>
      <Box sx={styles.filtersCounter}>
        <Typography>2</Typography>
      </Box>
    </Box>
  )
}
export default ShowAllFiltersButton
