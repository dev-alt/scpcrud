import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';



function Header() {


  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/create" color="inherit">
              Add Entry
            </Button>
            <Button component={Link} to="/catalog" color="inherit">
              Catalog
            </Button>
          </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
