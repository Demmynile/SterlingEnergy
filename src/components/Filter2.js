import React from "react";
import { Container, InputAdornment, TextField } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const Filter2 = ({ verify, setVerify }) => {
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
          onChange={(e) => setVerify(e.target.value)}
          value={verify || ""}
        />
      </Container>
    </div>
  );
};

export default Filter2;
