import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { db } from '../utils/DbConfig';
import { collection, getDocs } from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';


function Catalog() {
  const [data, setData] = useState([]);

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

  return (
    <Box>
      <Box sx={{ mt: 0, textAlign: 'center', color: 'error.main' }}>
        <Typography variant='h6' sx={{ textAlign: 'center', color: 'red' }}>Catalog Data</Typography>
      </Box>
      
      <Box sx={{ margin: 5 }}>
        {data.map((item) => (
          <Box key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <Typography variant="h6">{item.Number} {item.Name}</Typography>
            </Link>
            

          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Catalog;
