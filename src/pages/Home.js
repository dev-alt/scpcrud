import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, Tooltip, Zoom } from '@mui/material';
import { db } from '../utils/DbConfig';
import { collection, getDocs } from 'firebase/firestore';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import '../utils/style.css'

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
    <Box>
      <Box sx={{ mt: 0, textAlign: 'center', color: "primary.dark" }}>
        <Typography variant='h3' sx={{ textAlign: 'center' }}>SCP Foundation</Typography>
      </Box>
      <Box sx={{ p: 3, m: 3 }}>
        {currentItems.map((item) => (
          <Box key={item.id}>
            <Zoom in timeout={{ enter: 2000 }}>
              <Paper elevation={4} sx={{ width: "80vw", margin: "2rem", padding: "1rem" }} >
                <Link to={`/detail/${item.id}`} >
                  <Typography variant="h6" sx={{
                    '&:link': {
                      color: 'blue',
                    },
                    '&:visited': {
                      color: 'purple',
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
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous Page
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={indexOfLastItem >= data.length}
      >
        Next Page
      </Button>
    </Box>
  );
}

export default Home;
