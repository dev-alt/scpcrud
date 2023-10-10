import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { db } from '../../utils/DbConfig';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

function Update() {
    const { itemId } = useParams();
    const [dataName, setDataName] = useState('');
    const [dataNumber, setDataNumber] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataContainment, setDataContainment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Load data when itemId changes
        const fetchData = async () => {
            if (itemId) {
                const OurCollection = collection(db, 'data');
                const itemRef = doc(OurCollection, itemId);
                const ourDocsToRead = await getDoc(itemRef);

                if (ourDocsToRead.exists()) {
                    const itemData = ourDocsToRead.data();
                    setDataNumber(itemData.Number);
                    setDataName(itemData.Name);
                    setDataDescription(itemData.Description);
                    setDataContainment(itemData.Containment);
                } else {
                    setDataNumber('');
                    setDataName('');
                    setDataDescription('');
                    setDataContainment('');
                }
            } else {
                setDataNumber('');
                setDataName('');
                setDataDescription('');
                setDataContainment('');
            }
        };

        fetchData();
    }, [itemId]);

    const crudUpdate = async (event) => {
        event.preventDefault();

        if (itemId) {
            const OurCollection = collection(db, 'data');
            const itemRef = doc(OurCollection, itemId);

            await updateDoc(itemRef, {
                Name: dataName,
                Description: dataDescription,
                Containment: dataContainment,
            });

            setDataName('');
            setDataDescription('');
            setDataContainment('');

            navigate('/');
        }
    };

    return (
        <Box>
            <Box sx={{ mt: 0, textAlign: 'center', color: 'error.main' }}>
            <Typography variant='h6' sx={{ textAlign: 'center', color: 'red' }}>Catalog Data</Typography>  

            </Box>
            <form onSubmit={crudUpdate}>
                <TextField
                    name="itemId"
                    label="Item ID"
                    variant="outlined"
                    value={itemId}
                    disabled // Make the input read-only
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, margin: 5 }}>
                    <TextField
                        name="number"
                        label="Number"
                        variant="outlined"
                        value={dataNumber}
                        onChange={(event) => setDataNumber(event.target.value)}
                    />
                    <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={dataName}
                        onChange={(event) => setDataName(event.target.value)}
                    />
                    <TextField
                        name="containment"
                        label="Containment"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={dataContainment}
                        onChange={(event) => setDataContainment(event.target.value)}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        value={dataDescription}
                        onChange={(event) => setDataDescription(event.target.value)}
                    />

                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 4, mb: 5, textAlign: 'center', width: '200px' }}>
                        Update Entry
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default Update;
