import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Grid,
} from "@mui/material";
import { db } from "../../utils/DbConfig";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Update() {
  const { itemId } = useParams();
  const [dataName, setDataName] = useState("");
  const [dataNumber, setDataNumber] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataContainment, setDataContainment] = useState("");
  const [dataObjectClass, setDataObjectClass] = useState("");
  const [dataAddendumText, setDataAddendumText] = useState("");
  const [dataHistoryText, setDataHistoryText] = useState("");
  const [dataNotesText, setDataNotesText] = useState("");
  const [dataReferencesText, setDataReferencesText] = useState("");
  const [hasAddendum, setHasAddendum] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const [hasNotes, setHasNotes] = useState(false);
  const [hasReferences, setHasReferences] = useState(false);
  const navigate = useNavigate();
  const objectClasses = ["Safe", "Euclid", "Keter", "Thaumiel"];

  useEffect(() => {
    // Load data when itemId changes
    const fetchData = async () => {
      if (itemId) {
        const OurCollection = collection(db, "data");
        const itemRef = doc(OurCollection, itemId);
        const ourDocsToRead = await getDoc(itemRef);

        if (ourDocsToRead.exists()) {
          const itemData = ourDocsToRead.data();
          setDataNumber(itemData.Number);
          setDataName(itemData.Name);
          setDataDescription(itemData.Description);
          setDataContainment(itemData.Containment);
          setDataObjectClass(itemData.ObjectClass || ""); // Make sure to provide a default value
          setDataAddendumText(itemData.AddendumText || "");
          setDataHistoryText(itemData.HistoryText || "");
          setDataNotesText(itemData.NotesText || "");
          setDataReferencesText(itemData.ReferencesText || "");
          setHasAddendum(!!itemData.AddendumText);
          setHasHistory(!!itemData.HistoryText);
          setHasNotes(!!itemData.NotesText);
          setHasReferences(!!itemData.ReferencesText);
        } else {
          setDataNumber("");
          setDataName("");
          setDataDescription("");
          setDataContainment("");
          setDataObjectClass("");
          setDataAddendumText("");
          setDataHistoryText("");
          setDataNotesText("");
          setDataReferencesText("");
          setHasAddendum(false);
          setHasHistory(false);
          setHasNotes(false);
          setHasReferences(false);
        }
      } else {
        setDataNumber("");
        setDataName("");
        setDataDescription("");
        setDataContainment("");
        setDataObjectClass("");
        setDataAddendumText("");
        setDataHistoryText("");
        setDataNotesText("");
        setDataReferencesText("");
        setHasAddendum(false);
        setHasHistory(false);
        setHasNotes(false);
        setHasReferences(false);
      }
    };

    fetchData();
  }, [itemId]);

  const crudUpdate = async (event) => {
    event.preventDefault();

    if (itemId) {
      const OurCollection = collection(db, "data");
      const itemRef = doc(OurCollection, itemId);

      await updateDoc(itemRef, {
        Name: dataName,
        Description: dataDescription,
        Containment: dataContainment,
        ObjectClass: dataObjectClass,
        AddendumText: hasAddendum ? dataAddendumText : null,
        HistoryText: hasHistory ? dataHistoryText : null,
        NotesText: hasNotes ? dataNotesText : null,
        ReferencesText: hasReferences ? dataReferencesText : null,
      });

      setDataName("");
      setDataDescription("");
      setDataContainment("");
      setDataObjectClass("");
      setDataAddendumText("");
      setDataHistoryText("");
      setDataNotesText("");
      setDataReferencesText("");

      navigate("/");
    }
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box
      sx={{
        width: "80%",
        margin: "0 auto",
        marginTop: "25px",
        marginBottom: "25px",
        background: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ mt: 0, textAlign: "center", color: "error.main" }}>
        <Typography variant="h4" gutterBottom>
          Catalog Data
        </Typography>
      </Box>
      <form onSubmit={crudUpdate}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 5, margin: 5 }}
        >
          <Grid item xs={12} md={2}>
            <TextField
              name="itemId"
              label="Item ID"
              variant="outlined"
              value={itemId}
              disabled // Make the input read-only
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <TextField
                name="number"
                label="Number"
                variant="outlined"
                value={dataNumber}
                onChange={(event) => setDataNumber(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                value={dataName}
                onChange={(event) => setDataName(event.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4} lg={2}>
              <FormControl fullWidth>
                <InputLabel shrink>Object Class</InputLabel>
                {objectClasses.map((objectClass) => (
                  <FormControlLabel
                    key={objectClass}
                    control={
                      <Checkbox
                        checked={dataObjectClass === objectClass}
                        onChange={() => setDataObjectClass(objectClass)}
                        name={objectClass}
                      />
                    }
                    label={objectClass}
                  />
                ))}
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            name="containment"
            label="Containment"
            variant="outlined"
            multiline
            rows={5}
            value={dataContainment}
            onChange={(event) => setDataContainment(event.target.value)}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            multiline
            rows={5}
            value={dataDescription}
            onChange={(event) => setDataDescription(event.target.value)}
          />

          <label>
            <input
              type="checkbox"
              checked={hasAddendum}
              onChange={() => setHasAddendum(!hasAddendum)}
            />
            Addendum
          </label>
          {hasAddendum && (
            <TextField
              name="addendumText"
              label="Addendum Text"
              variant="outlined"
              multiline
              rows={5}
              value={dataAddendumText}
              onChange={(event) => setDataAddendumText(event.target.value)}
            />
          )}
          <label>
            <input
              type="checkbox"
              checked={hasHistory}
              onChange={() => setHasHistory(!hasHistory)}
            />
            History
          </label>
          {hasHistory && (
            <TextField
              name="historyText"
              label="History Text"
              variant="outlined"
              multiline
              rows={4}
              value={dataHistoryText}
              onChange={(event) => setDataHistoryText(event.target.value)}
            />
          )}
          <label>
            <input
              type="checkbox"
              checked={hasNotes}
              onChange={() => setHasNotes(!hasNotes)}
            />
            Notes
          </label>
          {hasNotes && (
            <TextField
              name="notesText"
              label="Notes Text"
              variant="outlined"
              multiline
              rows={4}
              value={dataNotesText}
              onChange={(event) => setDataNotesText(event.target.value)}
            />
          )}

          <label>
            <input
              type="checkbox"
              checked={hasReferences}
              onChange={() => setHasReferences(!hasReferences)}
            />
            References
          </label>
          {hasReferences && (
            <TextField
              name="referencesText"
              label="References Text"
              variant="outlined"
              multiline
              rows={4}
              value={dataReferencesText}
              onChange={(event) => setDataReferencesText(event.target.value)}
            />
          )}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 4, mb: 5, textAlign: "center", width: "200px" }}
          >
            Upload Image
            <VisuallyHiddenInput type="file" />
          </Button>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 4, mb: 5, textAlign: "center", width: "200px" }}
          >
            Update Entry
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Update;
