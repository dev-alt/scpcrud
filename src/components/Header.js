import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box} from '@mui/material';
// import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';


import { collection,getDocs } from 'firebase/firestore';
import { db } from '../utils/DbConfig';

import { useEffect, useState,useRef } from 'react';


function Header() {
  const [files,setFiles]=useState([]);

useEffect(() => {
  const fetchData = async () => {
    const OurCollection = collection(db, 'data');
    const snapshot = await getDocs(OurCollection);

    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    setFiles(items);
    console.log(files)
  };

  fetchData();
}, []);




const anchorRef=useRef(null)
const [open,setOpen]=useState(false)


const handleClick=()=>{
  setOpen((prevOpen) => !prevOpen);
}
const handleClose=(event)=>{
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }

  setOpen(false);
}

const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);






  return (
    <>    <AppBar position="static">
      
      <Toolbar sx={{ display: 'flex', justifyContent: 'left' }}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/SCP_Foundation_%28emblem%29.svg/640px-SCP_Foundation_%28emblem%29.svg.png' alt='logo' width="30px"/>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/create" color="inherit">
              Add Entry
            </Button>
            <Button           ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick} color='inherit'>Files</Button>
                           {/* Dropdown items */}
      <Menu id='file-menu' anchorEl={anchorRef.current} open={open} onClose={handleClose}  >
        <MenuItem onClick={handleClose} >item one</MenuItem>
        <MenuItem onClick={handleClose} >item one</MenuItem>
        <MenuItem onClick={handleClose} >item one</MenuItem>
      {/* {files.map((file)=>{        
          
            <MenuItem onClick={handleClose} component={Link}
            to={`/detail/${file.id}`}>            
            </MenuItem>        
        
        })} */}

      </Menu>        

            

          </Box>



          


          
      </Toolbar>
    </AppBar>
 </>

  );}




export default Header;
