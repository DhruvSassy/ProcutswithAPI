import React from "react";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const ProductSearch = ({ input, handleChange }) => {
  return (
    <Paper
      component="form"
      sx={{
        p: "1px 2px",
        mt: 10,
        mb: -150,
        display: "flex",
        ml: 60,
        alignItems: "right",
        width: 400,
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, p: 2 }}
        placeholder="Search "
        type="search"
        inputProps={{ "aria-label": "search" }}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </Paper>
  );
};

export default ProductSearch;
