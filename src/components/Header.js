import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/DbConfig';
import { useEffect, useState, useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';

function Header() {
  const [files, setFiles] = useState([]);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const OurCollection = collection(db, 'data');
      const snapshot = await getDocs(OurCollection);
      console.log(snapshot)
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      console.log(items)
      setFiles(items);
    };

    fetchData();
  }, []);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'left' }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/SCP_Foundation_%28emblem%29.svg/640px-SCP_Foundation_%28emblem%29.svg.png" alt="logo" width="30px" />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/create" color="inherit">
            Add Entry
          </Button>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'file-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="menu"
            onClick={handleClick}
            color="inherit"
          >
            Files
          </Button>
          <Menu id="file-menu" anchorEl={anchorRef.current} open={open} onClose={handleClose}>
          {files.map((file) => (
  <MenuItem key={file.id} onClick={handleClose} component={Link} to={`/detail/${file.id}`}>
    {file.Number}
  </MenuItem>
))}
            <IconButton sx={{ ml: 3 }} component={Link} to="/create" color="inherit">
              <AddIcon />
            </IconButton>
          </Menu>


        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
