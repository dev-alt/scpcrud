import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Box, Typography } from '@mui/material';
import { db } from '../../utils/DbConfig';
import { collection, getDocs } from 'firebase/firestore';

function Read() {
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
        <h1>Read Data</h1>
      </Box>
      <Box sx={{ margin: 5 }}>
        {data.map((item) => (
          <div key={item.id}>
<Link to={`/detail/${item.id}`}>
  <Typography variant="h6">{item.Name}</Typography>
</Link>
            <Typography>{item.Description}</Typography>
            <Typography>{item.Containment}</Typography>
          </div>
        ))}
      </Box>
    </Box>
  );
}

export default Read;
