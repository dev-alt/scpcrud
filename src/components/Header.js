import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/DbConfig";
import AddIcon from "@mui/icons-material/Add";
import SearchBlock from "./SearchBlock";
import logo from "../utils/logo.png";
import MenuIcon from "@mui/icons-material/Menu";

function Header({ setSearchQuery, searchQuery }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [files, setFiles] = useState([]);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 600px");

  useEffect(() => {
    const fetchData = async () => {
      const OurCollection = collection(db, "data");
      const snapshot = await getDocs(OurCollection);
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
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

  return (
    <AppBar
      position="static"
      sx={{ boxShadow: "none", bgcolor: "transparent" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            width="40px"
            style={{ marginTop: "0.5rem" }}
          />
        </Link>
        {isSmallScreen ? (
          <IconButton sx={{ ml: "auto" }} onClick={handleClick} color="inherit">
            <MenuIcon />
          </IconButton>
        ) : (
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
        )}
        <Menu
          id="file-menu"
          anchorEl={anchorRef.current}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
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
            onClick={handleClose}
          >
            <AddIcon />
          </IconButton>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
