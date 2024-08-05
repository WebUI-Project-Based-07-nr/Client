import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { MusicNote, Language, Tag } from '@mui/icons-material';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ComputerIcon from '@mui/icons-material/Computer';
import BiotechIcon from '@mui/icons-material/Biotech';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SubjectIcon from '@mui/icons-material/Subject';
import ScienceIcon from '@mui/icons-material/Science';
import GradeIcon from '@mui/icons-material/Grade';
import { authRoutes } from '~/router/constants/authRoutes';
import styles from './PopularCategories.styles';


const categories = [
    { name: 'Languages', offers: 234, icon: <Language style={{ color: 'green' }} /> },
    { name: 'Mathematics', offers: 234, icon: <Tag style={{ color: 'orange' }} /> },
    { name: 'Computer science', offers: 234, icon: <ComputerIcon style={{ color: 'gray' }} /> },
    { name: 'Music', offers: 234, icon: <MusicNote style={{ color: 'red' }} /> },
    { name: 'Design', offers: 234, icon: <DesignServicesIcon /> },
    { name: 'History', offers: 234, icon: <Language style={{ color: 'red' }} /> },
    { name: 'Biology', offers: 234, icon: <BiotechIcon /> },
    { name: 'Painting', offers: 234, icon: <ColorLensIcon style={{ color: 'green' }} /> },
    { name: 'Finances', offers: 234, icon: <AccountBalanceIcon style={{ color: 'orange' }} /> }
];

const PopularCategories: React.FC = () => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(authRoutes.categories.path);
    };
    const handleViewAllClick = () => {
        navigate(authRoutes.categories.path);
    }

    return (
        <Box>
            <Typography variant='h4' gutterBottom sx={{marginLeft:'20px'}}>
                Popular Categories
            </Typography>
            <Box sx={styles.categoriesGrid}>
                {categories.map((category, index) => (
                    <Box key={index} sx={styles.categoryCard} onClick={handleCardClick}>
                        <Box sx={styles.categoryIcon}>{category.icon}</Box>
                        <Box sx={styles.categoryInfo}>
                            <Typography component='h3' sx={styles.categoryInfoTitle}>
                                {category.name}
                            </Typography>
                            <Typography component='h3' sx={styles.categoryInfoDescription}>
                                {category.offers} Offers
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box sx={{display:'flex', justifyContent:'center', marginTop:'16px'}}>
            <Button onClick={handleViewAllClick} variant='contained' sx={{backgroundColor:'whitesmoke', color:'black','&:hover': {
                            backgroundColor: '#dcdcdc',
                            color: 'black'
                        }}}>
                View All Categories
            </Button>
            </Box>
         
        </Box>
    );
};

export default PopularCategories;