import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
const SearchBlock = () => {
  return (
    <Box sx={{ width: "200px", bgcolor: "secondary" }}>
      <TextField
        variant="outlined"
        placeholder="Find a file"
        margin="dense"
        color="secondary"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="secondary" />
            </InputAdornment>
          ),
          sx: {
            "::placeholder": {
              color: "#ffffff",
            },

            bgcolor: "secondary",
            borderRadius: "50px",
            color: "#ffffff",
          },
        }}
      />
    </Box>
  );
};

export default SearchBlock;
