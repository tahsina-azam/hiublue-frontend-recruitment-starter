import { TablePagination } from '@mui/material';
import { OfferPaginationProps } from '@/types/types';

const OfferPagination: React.FC<OfferPaginationProps> = ({
  totalItems,
  perPage,
  page,
  handlePageChange,
  handleRowsPerPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      count={totalItems}
      rowsPerPage={perPage}
      page={page}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPageOptions={[3, 4, 5]}
    />
  );
};

export default OfferPagination;
