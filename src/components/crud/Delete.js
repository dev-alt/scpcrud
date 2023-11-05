import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { db } from "../../utils/DbConfig";
import { collection, doc, deleteDoc } from "firebase/firestore";

function Delete() {
  const { itemId } = useParams();
  const history = useNavigate();

  const handleDelete = async () => {
    try {
      const OurCollection = collection(db, "data");
      const itemRef = doc(OurCollection, itemId);

      // Delete the item from Firestore
      await deleteDoc(itemRef);

      // Redirect to the Read page after successful deletion
      history("/");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          mt: "30vh",
          textAlign: "center",
          color: "error.main",
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Delete Entry</Typography>
        <Typography variant="h6" color="secondary" sx={{ mt: "1rem" }}>
          Confirmation needed
        </Typography>{" "}
        <Box>
          {" "}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDelete}
            sx={{ mt: 4, mb: 5, textAlign: "center", width: "200px" }}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="primary"
            href={`/detail/${itemId}`}
            sx={{ mt: 4, mb: 5, ml: 5, textAlign: "center", width: "200px" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Delete;
