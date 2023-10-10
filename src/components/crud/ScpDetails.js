import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, IconButton,Tooltip, Zoom } from '@mui/material';
import { db } from '../../utils/DbConfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
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
            <Typography variant='h6' sx={{ textAlign: 'center', color: 'primary' }}>SCP Entry Details</Typography>
            <Zoom in timeout={2000}>
            <Paper elevation={3} sx={{ p: 3, m: 3 }}>
                <Box sx={{ mt: 0, textAlign: 'center', color: 'error.main' }}>

                </Box>
                
                {scpDetails ? (
                    <div>
                        <Typography variant="h5" sx={{ mb: 1 }}>{scpDetails.Number}</Typography>
                        <Typography variant="h2" sx={{ mb: 2 }}>{scpDetails.Name}</Typography>
                        <Typography variant="caption" sx={{ mb: 2 }}>{scpDetails.ObjectClass}</Typography>
                        <Typography variant='h5' sx={{ mb: 3 }}>Special Containment Procedures: </Typography>
                        <Typography>{scpDetails.Containment}</Typography>
                        <Typography variant='h5' sx={{ mt: 2,mb:1 }}>Description: </Typography>

                        <Typography variant="h3" sx={{ mb: 1 }}>{scpDetails.Number}</Typography>
                        <Typography variant="h4" sx={{ mb: 2 }}>{scpDetails.Name}</Typography>
                        <Typography variant="h4" sx={{ mb: 2 }}>{scpDetails.ObjectClass}</Typography>
                        <Typography variant='h6' sx={{ mb: 3 }}>Special Containment Procedures: </Typography>
                        <Typography>{scpDetails.Containment}</Typography>
                        <Typography variant='h6' sx={{ mt: 1, mb: 3 }}>Description: </Typography>
                        <Typography>{scpDetails.Description}</Typography>
                        <Tooltip title="Edit">
                        <IconButton
                            variant="text"
                            color="primary"
                            component={Link}
                            to={`/update/${scpDetails.id}`}
                        >
                            <EditNoteIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                        <IconButton
                            variant="text"
                            color='error'
                            
                            component={Link}
                            to={`/delete/${scpDetails.id}`}
                        >        <DeleteIcon />
                          
                        </IconButton>
                        </Tooltip>
                    </div>
                ) : (
                    <p>SCP Entry not found.</p>
                )}
            </Paper></Zoom>
        </Box>
    );
}

export default Detail;
