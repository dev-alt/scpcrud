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
  LinearProgress,
} from "@mui/material";
import { db } from "../../utils/DbConfig";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/DbConfig";
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
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(imageUrl);
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");
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
          setImageUrl(itemData.imageUrl);
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
        imageUrl: imageUrl,
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

  function handleChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(event.target.files[0]);
      const reader = new FileReader();

      reader.onload = (event) => {
        setImage(event.target.result);
      };

      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setImage(null);
      // setFile(null);
    }
    setFile(selectedFile);
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);
  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        setPercent(percent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setImageUrl(url);
            console.log(url);
          })
          .catch((error) => {
            console.error("Error getting download URL: ", error);
          });
      },
    );
  };

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
          {image && <img src={image} alt="Preview" width="200" />}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input
              type="file"
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
              onChange={handleChange}
              accept="/image/*"
            />
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={handleUpload}
              sx={{ width: { xs: "150px", md: "200px" }, mt: "1rem" }}
            >
              Upload Image
            </Button>
            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{ mt: 2, width: { xs: "150px", md: "200px" } }}
            />
            <p>Image uploading: {percent} % done</p>
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 4,
              mb: 5,
              textAlign: "center",
              width: { xs: "150px", md: "200px" },
            }}
          >
            Update Entry
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Update;
