import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import { db } from '../../utils/DbConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
function Detail() {
    const { itemId } = useParams();
    const [scpDetails, setScpDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const OurCollection = collection(db, 'data');
            const itemRef = doc(OurCollection, itemId);
            const ourDocsToRead = await getDoc(itemRef);

            if (ourDocsToRead.exists()) {
                setScpDetails({ id: ourDocsToRead.id, ...ourDocsToRead.data() });
            } else {
                setScpDetails(null);
            }
        };
        fetchData();
    }, [itemId]);

    return (
        <Box>
            <Typography variant='h6' sx={{ textAlign: 'center', color: 'red' }}>SCP Entry Details</Typography>
            <Paper elevation={3} sx={{ p: 3, m: 3 }}>
                <Box sx={{ mt: 0, textAlign: 'center', color: 'error.main' }}>

                </Box>
                {scpDetails ? (
                    <div>
                        <Typography variant="h3" sx={{ mb: 1 }}>{scpDetails.Number}</Typography>
                        <Typography variant="h4" sx={{ mb: 2 }}>{scpDetails.Name}</Typography>
                        <Typography variant="h4" sx={{ mb: 2 }}>{scpDetails.ObjectClass}</Typography>
                        <Typography variant='h6' sx={{ mb: 3 }}>Special Containment Procedures: </Typography>
                        <Typography>{scpDetails.Containment}</Typography>
                        <Typography variant='h6' sx={{ mt: 1, mb: 3 }}>Description: </Typography>
                        <Typography>{scpDetails.Description}</Typography>

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
                        >        <DeleteIcon /> Delete
                          
                        </Button>
                    </div>
                ) : (
                    <p>SCP Entry not found.</p>
                )}
            </Paper>
        </Box>
    );
}

export default Detail;
