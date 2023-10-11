import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    // Select,
    // MenuItem,
    // FormControl,
    // InputLabel,
    FormControlLabel,
    Checkbox,
    FormGroup,
    Typography
} from '@mui/material';
import { db } from '../../utils/DbConfig';
import { collection, addDoc } from 'firebase/firestore';



function CreateEntry() {
    // Define the state variables
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

    // Define the database collection
    const dataCollection = collection(db, 'data');
    const objectClasses = ['Safe', 'Euclid', 'Keter', 'Thaumiel'];


    /**
     * Handles the submission of a new entry by creating a data object with the form input values,
     * including optional fields if their corresponding checkboxes are checked, and adds it to the
     * specified data collection using the `addDoc` function. Then clears the form fields and resets
     * the checkbox states.
     *
     * @param {Event} event - The form submission event.
     * @returns {Promise<void>} A Promise that resolves when the new entry has been added to the data collection.
     */
    const handleCreateEntry = async (event) => {
        event.preventDefault();

        // Initialize an empty data object
        const data = {
            Number: entryNumber,
            Name: entryName,
            Description: entryDescription,
            Containment: entryContainment,
            ObjectClass: selectedObjectClass,
        };

        // Include Addendum text if the checkbox is checked
        if (hasAddendum) {
            data.AddendumText = entryAddendumText;
        }

        // Include History text if the checkbox is checked
        if (hasHistory) {
            data.HistoryText = entryHistoryText;
        }

        // Include Notes text if the checkbox is checked
        if (hasNotes) {
            data.NotesText = entryNotesText;
        }

        // Include References text if the checkbox is checked
        if (hasReferences) {
            data.ReferencesText = entryReferencesText;
        }

        await addDoc(dataCollection, data);

        // Clear form fields and reset checkbox states after submission
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
        <Box    sx={{
            width: '80%',
            margin: '0 auto', 
            marginTop: '25px', 
            background: '#f0f0f0',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }} >
            <Box sx={{ mt: 0, textAlign: 'center', color: 'error.main' }}>
                <Typography variant='h6' sx={{ textAlign: 'center', color: 'red' }}>Create Entry</Typography>

            </Box>
            <form onSubmit={handleCreateEntry}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, margin: 5 }}>
                    <TextField
                        name="number"
                        label="Number"
                        variant="outlined"
                        value={entryNumber}
                        onChange={(event) => {
                            const enteredValue = event.target.value;
                            // Remove any non-numeric characters from the input
                            const numericValue = enteredValue.replace(/\D/g, '');
                            // Set the state with the "SCP-" prefix and the numeric value
                            setEntryNumber(`SCP-${numericValue}`);
                        }}
                        placeholder="SCP-"
                    />
                    <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={entryName}
                        onChange={(event) => setEntryName(event.target.value)}
                    />
<Box sx={{ display: 'flex', flexDirection: 'column',border: '1px solid #000',  }}>
    <Typography variant="subtitle1" sx={{ml: 5 }}>Object Class</Typography>
    <FormGroup sx={{ display: 'flex', flexDirection: 'row', ml: 5  }}>
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
</Box>

                    <TextField
                        name="containment"
                        label="Containment"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={entryContainment}
                        onChange={(event) => setEntryContainment(event.target.value)}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        variant="outlined"
                        value={entryDescription}
                        onChange={(event) => setEntryDescription(event.target.value)}
                    />
                    <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
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

                    {hasAddendum && ( // Render the Addendum text field conditionally
                        <TextField
                            name="addendumText"
                            label="Addendum Text"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={entryAddendumText}
                            onChange={(event) => setEntryAddendumText(event.target.value)}
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
                        />
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 4, mb: 5, textAlign: 'center', width: '200px' }}
                    >
                        Create Entry
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default CreateEntry;
