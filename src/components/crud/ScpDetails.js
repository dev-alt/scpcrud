import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Zoom,
  Avatar,
} from "@mui/material";
import { db } from "../../utils/DbConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

function Detail() {
  const { itemId } = useParams();
  const [scpDetails, setScpDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const OurCollection = collection(db, "data");
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

  console.log(scpDetails);

  return (
    <Box>
      <Typography variant="h6" sx={{ textAlign: "center", color: "primary" }}>
        SCP Entry Details
      </Typography>
      <Zoom in timeout={1000}>
        <Paper
          elevation={3}
          sx={{ p: 3, mx: { xs: 0, sm: 10 }, position: "relative" }}
        >
          {scpDetails ? (
            <Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 1,
                  display: "flex",
                }}
              >
                <Tooltip title="Edit">
                  <IconButton
                    variant="text"
                    color="primary"
                    component={Link}
                    style={{ fontSize: "70px" }}
                    to={`/update/${scpDetails.id}`}
                  >
                    <EditNoteIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    variant="text"
                    color="error"
                    component={Link}
                    to={`/delete/${scpDetails.id}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {scpDetails.Number}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: { xs: "column", md: "row" },
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {scpDetails.Name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="error"
                    sx={{ mb: 2, ml: 3, fontWeight: "bold" }}
                  >
                    {scpDetails.ObjectClass}
                  </Typography>
                </Box>{" "}
                {scpDetails.imageUrl && (
                  <Avatar
                    alt="SCP"
                    src={scpDetails.imageUrl}
                    sx={{
                      width: { xs: "150px", sm: "300px" },
                      height: { xs: "150px", sm: "300px" },
                    }}
                  />
                )}
              </Box>

              <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
                Special Containment Procedures:{" "}
              </Typography>
              <Typography>{scpDetails.Containment}</Typography>
              <Typography
                variant="h5"
                sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
              >
                Description:{" "}
              </Typography>
              <Typography>{scpDetails.Description}</Typography>
              {scpDetails.AddendumText && (
                <div>
                  <Typography
                    variant="h5"
                    sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                  >
                    Addendum Text:
                  </Typography>
                  <Typography>{scpDetails.AddendumText}</Typography>
                </div>
              )}

              {scpDetails.HistoryText && (
                <div>
                  <Typography
                    variant="h5"
                    sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                  >
                    History Text:
                  </Typography>
                  <Typography>{scpDetails.HistoryText}</Typography>
                </div>
              )}

              {scpDetails.NotesText && (
                <div>
                  <Typography
                    variant="h5"
                    sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                  >
                    Notes Text:
                  </Typography>
                  <Typography>{scpDetails.NotesText}</Typography>
                </div>
              )}

              {scpDetails.ReferencesText && (
                <div>
                  <Typography
                    variant="h5"
                    sx={{ mt: 2, mb: 1, fontWeight: "bold" }}
                  >
                    References Text:
                  </Typography>
                  <Typography>{scpDetails.ReferencesText}</Typography>
                </div>
              )}
              <br />
            </Box>
          ) : (
            <p>SCP Entry not found.</p>
          )}
        </Paper>
      </Zoom>
    </Box>
  );
}

export default Detail;
