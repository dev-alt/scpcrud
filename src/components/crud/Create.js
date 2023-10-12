import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Typography,
    FormControl
} from '@mui/material';
import { db } from '../../utils/DbConfig';
import { collection, addDoc } from 'firebase/firestore';

function CreateEntry() {
    const [entryNumber, setEntryNumber] = useState('');
    const [entryName, setEntryName] = useState('');
    const [entryDescription, setEntryDescription] = useState('');
    const [entryContainment, setEntryContainment] = useState('');
    const [selectedObjectClass, setSelectedObjectClass] = useState('');
    const [hasAddendum, setHasAddendum] = useState(false);
    const [hasHistory, setHasHistory] = useState(false);
    const [hasNotes, setHasNotes] = useState(false);
    const [hasReferences, setHasReferences] = useState(false);
    const [entryAddendumText, setEntryAddendumText] = useState('');
    const [entryHistoryText, setEntryHistoryText] = useState('');
    const [entryNotesText, setEntryNotesText] = useState('');
    const [entryReferencesText, setEntryReferencesText] = useState('');

    const dataCollection = collection(db, 'data');
    const objectClasses = ['Safe', 'Euclid', 'Keter', 'Thaumiel'];

    const handleCreateEntry = async (event) => {
        event.preventDefault();

        const data = {
            Number: entryNumber,
            Name: entryName,
            Description: entryDescription,
            Containment: entryContainment,
            ObjectClass: selectedObjectClass,
        };

        if (hasAddendum) {
            data.AddendumText = entryAddendumText;
        }

        if (hasHistory) {
            data.HistoryText = entryHistoryText;
        }

        if (hasNotes) {
            data.NotesText = entryNotesText;
        }

        if (hasReferences) {
            data.ReferencesText = entryReferencesText;
        }

        await addDoc(dataCollection, data);

        setEntryNumber('');
        setEntryName('');
        setEntryDescription('');
        setEntryContainment('');
        setSelectedObjectClass('');
        setHasAddendum(false);
        setHasHistory(false);
        setHasNotes(false);
        setHasReferences(false);
        setEntryAddendumText('');
        setEntryHistoryText('');
        setEntryNotesText('');
        setEntryReferencesText('');
    };

    const handleAddendumCheckboxChange = (event) => {
        setHasAddendum(event.target.checked);
    };

    const handleHistoryCheckboxChange = (event) => {
        setHasHistory(event.target.checked);
    };

    const handleNotesCheckboxChange = (event) => {
        setHasNotes(event.target.checked);
    };

    const handleReferencesCheckboxChange = (event) => {
        setHasReferences(event.target.checked);
    };

    const handleObjectClassChange = (objectClass) => {
        setSelectedObjectClass(objectClass);
    };

    return (
        <Box
            sx={{
                width: '80%',
                margin: '0 auto',
                marginTop: '25px',
                background: '#f0f0f0',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box sx={{ mt: 0, textAlign: 'center', color: 'error.main' }}>
                <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>
                    Create Entry
                </Typography>
            </Box>
            <form onSubmit={handleCreateEntry}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, margin: 5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={2}>
                            <TextField
                                name="number"
                                label="Number"
                                variant="outlined"
                                value={entryNumber}
                                onChange={(event) => {
                                    const enteredValue = event.target.value;
                                    const numericValue = enteredValue.replace(/\D/g, '');
                                    setEntryNumber(`SCP-${numericValue}`);
                                }}
                                placeholder="SCP-"
                                fullWidth // Takes full width on all screen sizes
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                value={entryName}
                                onChange={(event) => setEntryName(event.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4} lg={2}> 
                            <FormControl fullWidth>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    Object Class
                                </Typography>
                                <FormGroup sx={{ display: 'flex' }}>
                                    {objectClasses.map((objectClass) => (
                                        <FormControlLabel
                                            key={objectClass}
                                            control={
                                                <Checkbox
                                                    checked={selectedObjectClass === objectClass}
                                                    onChange={() => handleObjectClassChange(objectClass)}
                                                    name={objectClass}
                                                />
                                            }
                                            label={objectClass}
                                        />
                                    ),)}
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <TextField
                        name="containment"
                        label="Containment"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={entryContainment}
                        onChange={(event) => setEntryContainment(event.target.value)}
                        fullWidth
                    />
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        value={entryDescription}
                        onChange={(event) => setEntryDescription(event.target.value)}
                        fullWidth
                    />
                    <FormGroup
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasAddendum}
                                    onChange={handleAddendumCheckboxChange}
                                    name="hasAddendum"
                                />
                            }
                            label="Addendum"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasHistory}
                                    onChange={handleHistoryCheckboxChange}
                                    name="hasHistory"
                                />
                            }
                            label="History"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasNotes}
                                    onChange={handleNotesCheckboxChange}
                                    name="hasNotes"
                                />
                            }
                            label="Notes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasReferences}
                                    onChange={handleReferencesCheckboxChange}
                                    name="hasReferences"
                                />
                            }
                            label="References"
                        />
                    </FormGroup>

                    {hasAddendum && (
                        <TextField
                            name="addendumText"
                            label="Addendum Text"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={entryAddendumText}
                            onChange={(event) => setEntryAddendumText(event.target.value)}
                            fullWidth
                        />
                    )}

                    {hasHistory && (
                        <TextField
                            name="historyText"
                            label="History"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={entryHistoryText}
                            onChange={(event) => setEntryHistoryText(event.target.value)}
                            fullWidth
                        />
                    )}

                    {hasNotes && (
                        <TextField
                            name="notesText"
                            label="Notes"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={entryNotesText}
                            onChange={(event) => setEntryNotesText(event.target.value)}
                            fullWidth
                        />
                    )}

                    {hasReferences && (
                        <TextField
                            name="referencesText"
                            label="References"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={entryReferencesText}
                            onChange={(event) => setEntryReferencesText(event.target.value)}
                            fullWidth
                        />
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 4, mb: 5, width: '100%' }}
                    >
                        Create Entry
                    </Button>
                </Box>

            </form>
        </Box>

    );
}

export default CreateEntry;

