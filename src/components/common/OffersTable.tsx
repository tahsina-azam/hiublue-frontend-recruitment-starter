'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from 'context/authContext';
import OfferTableRows from './OfferTableRows';
import OfferPagination from './OfferPagination';
import { Offer } from '@/types/types';
import StatusSelector from './StatusSelector';

const API_URL = 'https://dummy-1.hiublue.com/api/offers';

const OffersTable: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [search, setSearch] = useState<string>('');
  const { token } = useAuth();
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'accepted'>(
    'all'
  );
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    fetchOffers();
  }, [search, typeFilter, selectedStatus, page, perPage]);

  const fetchOffers = async () => {
    try {
      let query = `${API_URL}?page=${page + 1}&per_page=${perPage}`;
      if (search) query += `&search=${search}`;
      if (typeFilter) query += `&type=${typeFilter}`;
      if (selectedStatus !== 'all') query += `&status=accepted`;

      const response = await fetch(query, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setOffers(data.data);
      setTotalItems(data.meta.total);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  return (
    <Box
      sx={{
        width: '1180px',
        height: 'auto',
        margin: 'auto',
        marginBottom: '20px',
      }}
    >
      <Card sx={{ width: '1180px', height: 'auto' }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Offers Table
          </Typography>

          {/* Status Selection Buttons */}
          {/* <Box sx={{ display: "flex", gap: 2 }}>
            <Button onClick={() => setSelectedStatus("all")} sx={{ fontWeight: selectedStatus === "all" ? "bold" : "normal" }}>All</Button>
            <Button onClick={() => setSelectedStatus("accepted")} sx={{ fontWeight: selectedStatus === "accepted" ? "bold" : "normal" }}>Accepted</Button>
          </Box> */}
          <StatusSelector
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          <Divider />

          {/* Search & Filter Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 2,
              marginTop: '20px',
            }}
          >
            <TextField
              variant="outlined"
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            <Select
              displayEmpty
              size="small"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              sx={{ width: 150 }}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </Box>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <OfferTableRows offers={offers} />
            </Table>
          </TableContainer>

          {/* Pagination */}
          <OfferPagination
            totalItems={totalItems}
            perPage={perPage}
            page={page}
            handlePageChange={(_, newPage) => setPage(newPage)}
            handleRowsPerPageChange={(event) => {
              setPerPage(Number(event.target.value));
              setPage(0);
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default OffersTable;
