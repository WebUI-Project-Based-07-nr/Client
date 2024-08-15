import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { SortEnum } from '~/types'
import { authRoutes } from '~/router/constants/authRoutes'

export const columns = [
  {
    label: 'Actions',
    field: 'actions',
    calculatedCellValue: (item, { navigate }) => {
      const createUrlPath2 = (path, id) => path.replace(':quizId', id);
const handleEditClick = () => {
  navigate(createUrlPath2(authRoutes.myResources.editQuiz.path, item._id));
}

      return (
        <Box>
          <Typography onClick={handleEditClick} sx={{ cursor: 'pointer' }}>
            Edit
          </Typography>
        </Box>
      );
    }
  }
]



export const itemsLoadLimit = {
  default: 10,
  tablet: 8,
  mobile: 6
}