import {
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Offer } from '@/types/types';

const getStatusColor = (status: Offer['status']) => {
  switch (status) {
    case 'accepted':
      return { bg: '#D4EDDA', text: '#155724' };
    case 'pending':
      return { bg: '#FFF3CD', text: '#856404' };
    case 'rejected':
      return { bg: '#F8D7DA', text: '#721C24' };
    default:
      return { bg: '#E9ECEF', text: '#495057' };
  }
};

interface OfferTableRowsProps {
  offers: Offer[];
}

const OfferTableRows: React.FC<OfferTableRowsProps> = ({ offers }) => {
  return (
    <TableBody>
      {offers.map((offer) => (
        <TableRow key={offer.id}>
          <TableCell>
            <span>
              {offer.user_name}
              <br />
              <Typography sx={{ fontSize: '11px', color: 'grey' }}>
                {offer.email}
              </Typography>
            </span>
          </TableCell>
          <TableCell>{offer.phone}</TableCell>
          <TableCell>{offer.company}</TableCell>
          <TableCell>{offer.jobTitle}</TableCell>
          <TableCell>{offer.type}</TableCell>
          <TableCell>
            <Box
              sx={{
                display: 'inline-block',
                px: 1,
                py: 0.5,
                borderRadius: '3px',
                fontSize: '10px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                backgroundColor: getStatusColor(offer.status).bg,
                color: getStatusColor(offer.status).text,
              }}
            >
              {offer.status}
            </Box>
          </TableCell>
          <TableCell align="right">
            <IconButton color="grey">
              <EditIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OfferTableRows;
