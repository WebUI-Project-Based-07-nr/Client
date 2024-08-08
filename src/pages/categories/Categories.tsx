import { useEffect } from 'react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { MusicNote, Language, Tag } from '@mui/icons-material'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import ComputerIcon from '@mui/icons-material/Computer'
import BiotechIcon from '@mui/icons-material/Biotech'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import SubjectIcon from '@mui/icons-material/Subject'
import ScienceIcon from '@mui/icons-material/Science'
import GradeIcon from '@mui/icons-material/Grade'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { styles } from './Categories.styles'
import { categoryService } from '~/services/category-service'

const categories = [
  { name: 'Languages', offers: 234, icon: <Language style={{ color: 'green' }} /> },
  { name: 'Mathematics', offers: 234, icon: <Tag style={{ color: 'orange' }} /> },
  { name: 'Computer science', offers: 234, icon: <ComputerIcon style={{ color: 'gray' }} /> },
  { name: 'Music', offers: 234, icon: <MusicNote style={{ color: 'red' }} /> },
  { name: 'Design', offers: 234, icon: <DesignServicesIcon /> },
  { name: 'History', offers: 234, icon: <Language style={{ color: 'red' }} /> },
  { name: 'Biology', offers: 234, icon: <BiotechIcon /> },
  { name: 'Painting', offers: 234, icon: <ColorLensIcon style={{ color: 'green' }} /> },
  { name: 'Finances', offers: 234, icon: <AccountBalanceIcon style={{ color: 'orange' }} /> },
  { name: 'Audit', offers: 234, icon: <SubjectIcon style={{ color: 'red' }} /> },
  { name: 'Chemistry', offers: 234, icon: <ScienceIcon style={{ color: 'red' }} /> },
  { name: 'Astronomy', offers: 234, icon: <GradeIcon /> },
  { name: 'Languages', offers: 234, icon: <Language style={{ color: 'green' }} /> },
  { name: 'Mathematics', offers: 234, icon: <Tag style={{ color: 'orange' }} /> },
  { name: 'Computer science', offers: 234, icon: <ComputerIcon style={{ color: 'gray' }} /> },
  { name: 'Music', offers: 234, icon: <MusicNote style={{ color: 'red' }} /> },
  { name: 'Design', offers: 234, icon: <DesignServicesIcon /> },
  { name: 'History', offers: 234, icon: <Language style={{ color: 'red' }} /> },
]

const Categories: React.FC = () => {
  useEffect(() => {
     const getData = async() => {
      await categoryService.getCategories()
    }

    getData()
  }, [])

  return (
    <PageWrapper>
      <Box sx={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <Link
            to={`/subject/${category.name.toLowerCase()}`}
            state={{ categoryName: category.name }}
            key={index}
          >
            <Box sx={styles.categoryCard}>
              <Box sx={styles.categoryIcon}>{category.icon}</Box>
              <Box sx={styles.categoryInfo}>
                <Typography
                  component="h3"
                  style={{
                    fontFamily: 'Rubik',
                    fontWeight: 500,
                    fontSize: '20px',
                    lineHeight: '28px',
                    letterSpacing: '0.15px',
                  }}
                  variant="h6"
                >
                  {category.name}
                </Typography>
                <Typography
                  style={{
                    fontFamily: 'Rubik',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.0025em',
                    color: '#888',
                  }}
                  variant="body2"
                >
                  {category.offers} Offers
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </PageWrapper>
  )
}

export default Categories