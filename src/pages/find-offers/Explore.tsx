import { Button,Box, Container, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import subjectImage from '/Users/mistercap/Desktop/Frontend/Client/src/assets/img/offers-page/subject-icon.svg';
import leftArrow from '/Users/mistercap/Desktop/Frontend/Client/src/assets/img/offers-page/arrow.svg';
import searchIcon from '/Users/mistercap/Desktop/Frontend/Client/src/assets/img/offers-page/searchIcon.svg';

interface Offer {
    category:string;
    subject:string;
    name:string;
    description:string;
}

const Explore:React.FC =()=> {
    const [category,setCategory] = useState<string>('');
    const [subject,setSubject] = useState('');
    const [searchTerm,setSearchTerm] = useState('');
    const [offers,setOffers] = useState<Offer[]>([]);
    const [filteredOffers,setFilteredOffers] = useState<Offer[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        let filtered = offers;

        if(category) {
            filtered = filtered.filter(offer=>offer.category === category);
        }
        if(subject) {
            filtered = filtered.filter(offer=> offer.subject === subject);
        }
        if(searchTerm) {
            filtered = filtered.filter(offer => offer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            offer.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredOffers(filtered);

    },[category,subject,searchTerm,offers]);

    const handleSearch =() => {

    };

    const handleKeyPress = (event:KeyboardEvent) => {
if(event.key === 'Enter') {
    handleSearch();
}
    };
    
  return (
    <>
    <Container maxWidth='md' style={{backgroundColor:'#c9ebeb',borderRadius:8,padding:'16px',position:'relative',height:'250px'}}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
<Box style={{marginTop:'40px',marginLeft:'20px'}}>
    <Typography variant='h5' align='left' color='black'>Tutors for private lessons</Typography>
    <Typography variant='body2' align='left' color='black' style={{marginBottom:'16px'}}>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
    </Typography>
    <Button variant='contained' style={{backgroundColor:'black',color:'white',marginTop:'16px'}}>
        Create request
    </Button>
</Box>
<Box display='flex' justifyContent='center' alignItems='center' marginLeft='150px' marginTop='25px' >
    <img src={subjectImage} style={{height:'150px',width:'auto',marginRight:'50px'}} />
</Box>
        </Box>
 </Container>

<Typography variant='h5' align='center' style={{marginTop:'16px'}}>Explore Offers</Typography>
<Typography variant='body2' align='center' style={{marginBottom:'16px'}}>
 Discover offers in your area of interest
</Typography>

<Box 
        display="flex" 
        alignItems="center" 
        style={{ marginBottom: '16px', marginLeft: '44px', cursor: 'pointer' }} 
        onClick={() => navigate('/categories')}
      >
        <img src={leftArrow} alt="Back" style={{ height: '20px', width: 'auto', marginRight: '8px' }} />
        <Typography variant="body2" align="left">Back to all categories</Typography>
      </Box>


<Box 
display='flex'
 alignItems='center'
 justifyContent='space-between'
  style={{
    marginTop:'26px',
    backgroundColor:'white',
    borderRadius:55,
    padding:'34px',
    margin:'16px 0',
    }}>
<FormControl variant='outlined' style={{marginRight:'16px',flex:1}}>
    <InputLabel>Category</InputLabel>
    <Select value={category} onChange={(e)=> setCategory(e.target.value)} label='Category'>
        <MenuItem value='Category1'>Category1</MenuItem>
        <MenuItem value='Category2'>Category2</MenuItem>
    </Select>
</FormControl>

<FormControl variant='outlined' style={{marginRight:'8px',marginLeft:'8px',flex:1}}>
    <InputLabel>Subject</InputLabel>
    <Select value={subject} onChange={(e)=>setSubject(e.target.value)} label='Subject'>
        <MenuItem value='Subject1'>Subject 1</MenuItem>
        <MenuItem value='Subject2'>Subject 2</MenuItem>
    </Select>
</FormControl>
<img style={{marginLeft:'24px'}} src={searchIcon}/> 

<TextField variant='outlined'
 placeholder='Search by tutor name'
  value={searchTerm}
   onChange={(e)=> setSearchTerm(e.target.value)} 
   onKeyDown={handleKeyPress}
 sx={{
    flex:2,
    marginRight:'8px',
    '.MuiOutlinedInput-root': {
        '& fieldset': {
          border: 'none',
        },
      },
 }}
   />
<Button variant='contained' style={{marginRight:'10px',transform:'translateX(-18px)'}}>
    Search
</Button>
</Box>


    </>
  )
};

export default Explore;
