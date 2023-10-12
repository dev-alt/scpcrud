import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Tooltip, Zoom, IconButton, useTheme, Button } from '@mui/material';
import { db } from '../utils/DbConfig';
import { collection, getDocs } from 'firebase/firestore';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
              style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
            >
              <ReadMoreIcon />
            </Button>
          </Tooltip>
        )}
        {showFullText && (
          <Button onClick={() => setShowFullText(false)} style={{ cursor: 'pointer' }}>
            Show Less
          </Button>
        )}
      </Typography>
    </Box>
  );
}

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const theme = useTheme(); // Access the MUI theme here

  useEffect(() => {
    const fetchData = async () => {
      const OurCollection = collection(db, 'data');
      const snapshot = await getDocs(OurCollection);

      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setData(items);
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

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
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', flex: '0 0 100%' }}>
        <Box
          sx={{
            width: '100%',
            flex: '0 0 100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              mt: 0,
              textAlign: 'center',
              color: "primary.dark",
              [theme.breakpoints.up('md')]: {
                fontSize: '2.5rem', // Adjust font size for medium screens and larger
              },
            }}
          >
            <Typography variant='h3' sx={{ textAlign: 'center' }}>
              SCP Foundation
            </Typography>
          </Box>
          <Box sx={{ p: 3, m: 3 }}>
            {currentItems.map((item) => (
              <Box key={item.id}>
                <Zoom in timeout={{ enter: 2000 }}>
                  <Paper
                    elevation={4}
                    sx={(theme) => ({
                      width: '90%', // Default width for smaller screens
                      margin: '2rem auto', // Center horizontally
                      padding: '1rem',
                      [theme.breakpoints.up('md')]: {
                        width: '60%', // Adjust width for medium screens and larger
                      },
                      [theme.breakpoints.up('lg')]: {
                        width: '80%', // Adjust width for larger screens
                      },
                    })}
                  >
                    <Link to={`/detail/${item.id}`}>
                      <Typography
                        variant='h6'
                        sx={{
                          '&:link': {
                            color: 'blue',
                          },
                          '&:visited': {
                            color: 'red',
                          },
                          '&:hover': {
                            textDecoration: 'underline',
                            color: 'green',
                          },
                          '&:active': {
                            color: 'primary',
                            textDecoration: 'none',
                          },
                        }}
                      >
                        {item.Number} {item.Name}
                      </Typography>
                    </Link>
                    <ContainmentText text={item.Containment} maxChars={maxChars} />
                  </Paper>
                </Zoom>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label='Previous Page'
              aria-disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastItem >= data.length}
              aria-label='Next Page'
              aria-disabled={indexOfLastItem >= data.length}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
