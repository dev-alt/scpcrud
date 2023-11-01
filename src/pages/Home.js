import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Tooltip,
  Zoom,
  IconButton,
  useTheme,
  Button,
  Grid,
  Divider,
  Link as MuiLink,
  Fab,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../utils/DbConfig";
import { collection, getDocs } from "firebase/firestore";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import banner from "../components/banner.jpg";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

function ContainmentText({ text, maxChars }) {
  const [showFullText, setShowFullText] = useState(false);
  const truncatedText = showFullText ? text : text.slice(0, maxChars);

  return (
    <Box>
      <Typography>
        {truncatedText}
        {!showFullText && text.length > maxChars && (
          <Tooltip title="Read More">
            <Button
              onClick={() => setShowFullText(true)}
              style={{
                cursor: "pointer",
                border: "none",
                background: "none",
                padding: 0,
              }}
            >
              <ReadMoreIcon />
            </Button>
          </Tooltip>
        )}
        {showFullText && (
          <Button
            onClick={() => setShowFullText(false)}
            style={{ cursor: "pointer" }}
          >
            Show Less
          </Button>
        )}
      </Typography>
    </Box>
  );
}

function Home({ searchQuery }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const theme = useTheme();
  const [previousPage, setPreviousPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const OurCollection = collection(db, "data");
      const snapshot = await getDocs(OurCollection);

      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setData(items);
    };

    fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let totalItems;
  let currentItems;

  const [loading, setLoading] = useState(true);
  const filteredItems = data.filter((item) => {
    if (typeof searchQuery === "string") {
      return (
        item.Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Containment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.Description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // return currentItems;
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  if (searchQuery) {
    currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    totalItems = filteredItems.length;
  } else {
    currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    totalItems = data.length;
  }
  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
      setCurrentPage(previousPage);
    }
    setPreviousPage(currentPage);
  }, [searchQuery]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // Define different maxChars based on screen size
  let maxChars;
  if (theme.breakpoints.values.sm > theme.breakpoints.width) {
    maxChars = 100; // Smaller screens
  } else if (theme.breakpoints.values.md > theme.breakpoints.width) {
    maxChars = 150; // Medium screens
  } else {
    maxChars = 400; // Larger screens
  }

  const handlePageChange = (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {" "}
      <Box sx={{ width: "100%", flex: "0 0 100%" }}>
        <Box
          sx={{
            width: "100%",
            flex: "0 0 100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mt: 0,
              textAlign: "center",
              color: "primary.dark",
              [theme.breakpoints.up("md")]: {
                fontSize: "2.5rem",
              },
            }}
          >
            <Box
              sx={{
                width: "100vw",
                backgroundImage: `url(${banner})`,
                height: "15rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h2"
                color="text.primary"
                sx={{
                  textAlign: "center",
                  whiteSpace: { xs: "normal", md: "nowrap" },
                  fontWeight: "900",
                  opacity: "60%",
                  fontSize: { xs: "2rem", sm: "3rem" },
                  p: 2,
                }}
              >
                SCP Foundation
              </Typography>
            </Box>
          </Box>
          {loading ? (
            <Box
              width="100vw"
              height="60vw"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <Grid container sx={{ p: 3, my: 3 }}>
              {currentItems.map((item) => (
                <Grid item xs={12} sm={6} lg={4} key={item.id}>
                  <Zoom in timeout={{ enter: 100 }}>
                    <Paper
                      elevation={4}
                      sx={(theme) => ({
                        width: "90%",
                        margin: "2rem auto",
                        padding: "1rem",

                        [theme.breakpoints.up("lg")]: {
                          width: "80%",
                        },
                      })}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Link
                          to={`/detail/${item.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <MuiLink href={`/detail/${item.id}`} underline="none">
                            <Typography
                              variant="h6"
                              sx={{
                                textDecoration: "none",
                                "&:link": {
                                  color: "text.secondary",
                                },
                                "&:visited": {
                                  color: "red",
                                },
                                "&:hover": {
                                  textDecoration: "underline",
                                  color: "green",
                                },
                                "&:active": {
                                  color: "primary",
                                  textDecoration: "none",
                                },
                              }}
                            >
                              {item.Number} {item.Name}
                            </Typography>
                          </MuiLink>
                        </Link>
                        <Avatar
                          alt="SCP"
                          src={item.imageUrl}
                          sx={{
                            width: "50px",
                            height: "50px",
                          }}
                        />
                      </Box>
                      <Divider
                        variant="fullwidth"
                        light
                        sx={{ mt: 1, mb: 2 }}
                      />
                      <ContainmentText
                        text={item.Containment}
                        maxChars={maxChars}
                      />
                    </Paper>
                  </Zoom>
                </Grid>
              ))}
              {currentPage === totalPages && (
                <Grid item xs={12} sm={6} lg={4}>
                  <Zoom in timeout={{ enter: 100 }}>
                    <Paper
                      elevation={4}
                      sx={(theme) => ({
                        width: "90%",
                        margin: "2rem auto",
                        padding: "1rem",

                        [theme.breakpoints.up("lg")]: {
                          width: "80%",
                          height: "80%",
                        },
                        height: "90%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      })}
                    >
                      <Tooltip title="Create New Entry">
                        <Fab href="/create" size="large">
                          <AddIcon />
                        </Fab>
                      </Tooltip>
                    </Paper>
                  </Zoom>
                </Grid>
              )}
            </Grid>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              aria-disabled={currentPage === 1}
            >
              <ChevronLeftIcon color="secondary" />
            </IconButton>
            <IconButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastItem >= data.length}
              aria-label="Next Page"
              aria-disabled={indexOfLastItem >= data.length}
            >
              <ChevronRightIcon color="secondary" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
