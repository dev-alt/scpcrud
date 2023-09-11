import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { db } from '../utils/DbConfig';
import { collection, getDocs } from 'firebase/firestore';

// Define the ContainmentText component outside of Home
function ContainmentText({ text, maxChars }) {
  const [showFullText, setShowFullText] = useState(false);
  const truncatedText = showFullText ? text : text.slice(0, maxChars);

  return (
    <Typography>
      {truncatedText}
      {!showFullText && text.length > maxChars && (
        <button
          onClick={() => setShowFullText(true)}
          style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
        >
          ... Read More
        </button>
      )}
      {showFullText && (
        <Button onClick={() => setShowFullText(false)} style={{ cursor: 'pointer' }}>
          Show Less
        </Button>
      )}
    </Typography>
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
      <Box sx={{ mt: 0, textAlign: 'center', color: 'error.main' }}>
      <Typography variant='h6' sx={{ textAlign: 'center', color: 'red' }}>SCP Foundation</Typography>  

      </Box>
      <Box sx={{ margin: 5 }}>
        {currentItems.map((item) => (
          <Box key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <Typography variant="h6">{item.Number} {item.Name}</Typography>
            </Link>
            <ContainmentText text={item.Containment} maxChars={200} />
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
