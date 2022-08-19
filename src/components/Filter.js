import React from "react";
import { Container, InputAdornment, TextField } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const Filter = ({ query, setQuery }) => {
  return (
    <div>
      <Container>
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonSearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setQuery(e.target.value)}
          value={query || ""}
        />
      </Container>
    </div>
  );
};

export default Filter;
