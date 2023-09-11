import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { db } from '../../utils/DbConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function Detail() {
    const { itemId } = useParams();
  const [scpDetails, setScpDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const OurCollection = collection(db, 'data');
      const itemRef = doc(OurCollection, itemId);
      const itemSnapshot = await getDoc(itemRef);

      if (itemSnapshot.exists()) {
        setScpDetails({ id: itemSnapshot.id, ...itemSnapshot.data() });
      } else {
        // Handle item not found
        setScpDetails(null);
      }
    };

    fetchData();
  }, [itemId]);

  return (
    <Box>
      <Box sx={{ mt: 0, textAlign: 'center', color: 'error.main' }}>
        <h1>SCP Entry Details</h1>
      </Box>
      {scpDetails ? (
        <div>
          <Typography variant="h6">{scpDetails.Name}</Typography>
          <Typography>Special Containment Procedures: {scpDetails.Containment}</Typography>
          <Typography>Description:{scpDetails.Description}</Typography>


          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/update/${scpDetails.id}`}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            component={Link}
            to={`/delete/${scpDetails.id}`}
          >
            Delete
          </Button>
        </div>
      ) : (
        <p>SCP Entry not found.</p>
      )}
    </Box>
  );
}

export default Detail;
