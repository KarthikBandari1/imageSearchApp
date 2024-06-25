import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = (props) => {
  const { setPage, page, total } = props;
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} alignItems="center" className="m-4">
      <Pagination
        count={Math.ceil(total / 12)}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
};

export default PaginationComponent;
