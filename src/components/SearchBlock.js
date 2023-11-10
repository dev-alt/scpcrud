import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
const SearchBlock = ({ setSearchQuery, searchQuery }) => {
  return (
    <Box sx={{ width: "200px", bgcolor: "secondary", ml: "20px" }}>
      <TextField
        variant="outlined"
        placeholder="Search an entry"
        margin="dense"
        color="secondary"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="secondary" />
            </InputAdornment>
          ),
          sx: {
            "::placeholder": {
              color: "#ffffff",
              fontSize: "0.1rem",
            },

            bgcolor: "secondary",
            borderRadius: "50px",
            color: "#ffffff",
            fontSize: { xs: "0.7rem", sm: "1rem" },
          },
        }}
      />
    </Box>
  );
};

export default SearchBlock;
