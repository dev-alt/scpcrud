import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, Tooltip, Zoom } from '@mui/material';
import { db } from '../utils/DbConfig';
import { collection, getDocs } from 'firebase/firestore';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


// Define the ContainmentText component outside of Home
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

  // Calculate the index of the first and last items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page function
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Box sx={{ width: '100%', flex: '0 0 100%' }}>
      <Box sx={{ width: '100%', flex: '0 0 100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mt: 0, textAlign: 'center', color: "primary.dark" }}>
          <Typography variant='h3' sx={{ textAlign: 'center' }}>SCP Foundation</Typography>
        </Box>
          <Box sx={{ p: 3, m: 3 }}>
            {currentItems.map((item) => (
              <Box key={item.id}>
                <Zoom in timeout={{ enter: 2000 }}>
                  <Paper elevation={4} sx={{ width: "90%", margin: "2rem", padding: "1rem" }} >
                    <Link to={`/detail/${item.id}`} >
                      <Typography variant="h6" sx={{
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
                          textDecoration: 'none'
                        },
                      }}>{item.Number} {item.Name}</Typography>
                    </Link>
                    <ContainmentText text={item.Containment} maxChars={200} />
                  </Paper>
                </Zoom>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              aria-disabled={currentPage === 1}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastItem >= data.length}
              aria-label="Next Page"
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