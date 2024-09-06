import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating({type,rate,rating,setrating}) {

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      {type == 'readonly'?
        <Rating
        name="readOnly"
        value={rate}
        precision={0.1}
        readOnly
      />
      :<Rating
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setrating(newValue);
          console.log("Rating : ",newValue);
        }}
      />}
    </Box>
  );
}
