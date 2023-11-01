import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/DbConfig";
import { useEffect, useState, useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchBlock from "./SearchBlock";
import logo from "../utils/logo.png";

function Header({ setSearchQuery, searchQuery }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [files, setFiles] = useState([]);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const OurCollection = collection(db, "data");
      const snapshot = await getDocs(OurCollection);
      console.log(snapshot);
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      console.log(items);
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

  const sortedFiles = [...files].sort((a, b) => {
    const itemA = a.Number.toLowerCase();
    const itemB = b.Number.toLowerCase();
    if (itemA < itemB) {
      return -1;
    }
    if (itemA > itemB) {
      return 1;
    }
    return 0;
  });
  // const isSmallScreen = window.innerWidth <= 768;

  return (
    <AppBar
      position="static"
      sx={{ boxShadow: "none", bgcolor: "transparent" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <img src={logo} alt="logo" width="30px" />
        <Box
          sx={{
            display: "flex",

            gap: "20px",
            justifyItems: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>

            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "file-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="menu"
              onClick={handleClick}
              color="inherit"
            >
              Files
            </Button>
            <Menu
              id="file-menu"
              anchorEl={anchorRef.current}
              open={open}
              onClose={handleClose}
            >
              {sortedFiles.map((file) => (
                <MenuItem
                  key={file.id}
                  onClick={handleClose}
                  component={Link}
                  to={`/detail/${file.id}`}
                >
                  {file.Number}
                </MenuItem>
              ))}
              <IconButton
                sx={{ ml: 3 }}
                component={Link}
                to="/create"
                color="inherit"
              >
                <AddIcon />
              </IconButton>
            </Menu>
            <Button component={Link} to="/create" color="inherit">
              Add Entry
            </Button>
          </Box>

          {isHomePage && (
            <SearchBlock
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
