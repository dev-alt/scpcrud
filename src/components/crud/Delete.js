import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { db } from "../../utils/DbConfig";
import { collection, doc, deleteDoc } from "firebase/firestore";

function Delete() {
  const { itemId } = useParams();
  const history = useNavigate();

  console.log(itemId);

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
      <Box sx={{ mt: 0, textAlign: "center", color: "error.main" }}>
        <h1>Delete Entry</h1>
      </Box>
      <Typography variant="h6">
        Are you sure you want to delete this entry?
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleDelete}
        sx={{ mt: 4, mb: 5, textAlign: "center", width: "200px" }}
      >
        Delete Entry
      </Button>
    </Box>
  );
}

export default Delete;
