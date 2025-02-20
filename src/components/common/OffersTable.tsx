// 'use client';

// import { useState, useEffect } from 'react';
// import Divider from '@mui/material/Divider';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Select,
//   MenuItem,
//   IconButton,
//   TablePagination,
//   InputAdornment,
//   Button,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import SearchIcon from '@mui/icons-material/Search';

// const API_URL = 'https://dummy-1.hiublue.com/api/offers';

// const OffersTable = () => {
//   const [offers, setOffers] = useState([]);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [typeFilter, setTypeFilter] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' or 'accepted'
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchOffers();
//   }, [search, typeFilter, selectedStatus]);

//   const fetchOffers = async () => {
//     try {
//       let query = `${API_URL}?page=1&per_page=5`;
//       if (search) query += `&search=${search}`;
//       if (typeFilter) query += `&type=${typeFilter}`;
//       if (selectedStatus !== 'all') query += `&status=accepted`;

//       const response = await fetch(query, {
//         headers: { Authorization: 'Bearer fake-jwt-token' },
//       });
//       const data = await response.json();
//       setOffers(data.data);
//       setTotalPages(data.meta.last_page);
//     } catch (error) {
//       console.error('Error fetching offers:', error);
//     }
//   };

//   const handlePageChange = (_, newPage: any) => setPage(newPage);

//   return (
//     <Box
//       sx={{ width: '1180px', height: '750px', margin: 'auto', mt: 4, mb: 2 }}
//     >
//       <Card sx={{ width: '1180px', height: '710px' }}>
//         <CardContent>
//           <Typography variant="h5" sx={{ mb: 2 }}>
//             Offers Table
//           </Typography>

//           {/* Status Selection Buttons */}

//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Button
//               onClick={() => setSelectedStatus('all')}
//               sx={{
//                 position: 'relative',
//                 color: selectedStatus === 'all' ? '#000' : '#666',
//                 fontWeight: selectedStatus === 'all' ? 'bold' : 'normal',
//                 minWidth: 'auto',
//                 '&::after': {
//                   content: '""',
//                   position: 'absolute',
//                   left: 0,
//                   bottom: 0,
//                   width: '100%',
//                   height: '2px',
//                   backgroundColor:
//                     selectedStatus === 'all' ? 'black' : 'transparent',
//                 },
//               }}
//             >
//               All
//             </Button>
//             <Button
//               onClick={() => setSelectedStatus('accepted')}
//               sx={{
//                 position: 'relative',
//                 color: selectedStatus === 'accepted' ? '#000' : '#666',
//                 fontWeight: selectedStatus === 'accepted' ? 'bold' : 'normal',
//                 minWidth: 'auto',
//                 '&::after': {
//                   content: '""',
//                   position: 'absolute',
//                   left: 0,
//                   bottom: 0,
//                   width: '100%',
//                   height: '2px',
//                   backgroundColor:
//                     selectedStatus === 'accepted' ? 'black' : 'transparent',
//                 },
//               }}
//             >
//               Accepted
//             </Button>
//           </Box>

//           <Divider />

//           {/* Search & Filter Section */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 2,
//               mb: 2,
//               marginTop: '20px',
//             }}
//           >
//             {/* Search Input */}
//             <TextField
//               variant="outlined"
//               size="small"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search..."
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{ minWidth: 250 }}
//             />

//             {/* Type Filter */}
//             <Select
//               displayEmpty
//               size="small"
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               sx={{ width: 150 }}
//             >
//               <MenuItem value="">All Types</MenuItem>
//               <MenuItem value="yearly">Yearly</MenuItem>
//               <MenuItem value="monthly">Monthly</MenuItem>
//             </Select>
//           </Box>

//           {/* Table */}
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Phone Number</TableCell>
//                   <TableCell>Company</TableCell>
//                   <TableCell>Job Title</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell align="right">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {offers.slice(page * 5, page * 5 + 5).map((offer) => (
//                   <TableRow key={offer.id}>
//                     <TableCell>
//                       <span>
//                         {offer.user_name}
//                         <br />
//                         <Typography sx={{ fontSize: '11px', color: 'grey' }}>
//                           {offer.email}
//                         </Typography>
//                       </span>
//                     </TableCell>
//                     <TableCell>{offer.phone}</TableCell>
//                     <TableCell>{offer.company}</TableCell>
//                     <TableCell>{offer.jobTitle}</TableCell>
//                     <TableCell>{offer.type}</TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           display: 'inline-block',
//                           px: 1,
//                           py: 0.5,
//                           fontSize: '10px',
//                           fontWeight: 'bold',
//                           textTransform: 'uppercase',
//                           backgroundColor: getStatusColor(offer.status).bg,
//                           color: getStatusColor(offer.status).text,
//                         }}
//                       >
//                         {offer.status}
//                       </Box>
//                     </TableCell>
//                     <TableCell align="right">
//                       <IconButton color="grey">
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton>
//                         <MoreVertIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//           <TablePagination
//             component="div"
//             count={offers.length}
//             rowsPerPage={5}
//             page={page}
//             onPageChange={handlePageChange}
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// // Function to get status colors
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case 'accepted':
//       return { bg: '#D4EDDA', text: '#155724' }; // Light green background, dark green text
//     case 'pending':
//       return { bg: '#FFF3CD', text: '#856404' }; // Light yellow background, dark yellow text
//     case 'rejected':
//       return { bg: '#F8D7DA', text: '#721C24' }; // Light red background, dark red text
//     default:
//       return { bg: '#E9ECEF', text: '#495057' }; // Default grey
//   }
// };

// export default OffersTable;


// 'use client';

// import { useState, useEffect } from 'react';
// import Divider from '@mui/material/Divider';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Select,
//   MenuItem,
//   IconButton,
//   TablePagination,
//   InputAdornment,
//   Button,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import SearchIcon from '@mui/icons-material/Search';

// const API_URL = 'https://dummy-1.hiublue.com/api/offers';

// const OffersTable = () => {
//   const [offers, setOffers] = useState([]);
//   const [search, setSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [typeFilter, setTypeFilter] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' or 'accepted'
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5); // Default 5 per page

//   useEffect(() => {
//     fetchOffers();
//   }, [search, typeFilter, selectedStatus, page, rowsPerPage]);

//   const fetchOffers = async () => {
//     try {
//       let query = `${API_URL}?page=${page + 1}&per_page=${rowsPerPage}`;
//       if (search) query += `&search=${search}`;
//       if (typeFilter) query += `&type=${typeFilter}`;
//       if (selectedStatus !== 'all') query += `&status=accepted`;

//       const response = await fetch(query, {
//         headers: { Authorization: 'Bearer fake-jwt-token' },
//       });
//       const data = await response.json();
//       setOffers(data.data);
//       setTotalPages(data.meta.last_page); // Update total pages based on response
//     } catch (error) {
//       console.error('Error fetching offers:', error);
//     }
//   };

//   const handlePageChange = (_, newPage: number) => setPage(newPage);

//   const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to first page when rows per page change
//   };

//   return (
//     <Box
//       sx={{ width: '1180px', height: '750px', margin: 'auto', mt: 4, mb: 2 }}
//     >
//       <Card sx={{ width: '1180px', height: '710px' }}>
//         <CardContent>
//           <Typography variant="h5" sx={{ mb: 2 }}>
//             Offers Table
//           </Typography>

//           {/* Status Selection Buttons */}
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Button
//               onClick={() => setSelectedStatus('all')}
//               sx={{
//                 position: 'relative',
//                 color: selectedStatus === 'all' ? '#000' : '#666',
//                 fontWeight: selectedStatus === 'all' ? 'bold' : 'normal',
//                 minWidth: 'auto',
//                 '&::after': {
//                   content: '""',
//                   position: 'absolute',
//                   left: 0,
//                   bottom: 0,
//                   width: '100%',
//                   height: '2px',
//                   backgroundColor:
//                     selectedStatus === 'all' ? 'black' : 'transparent',
//                 },
//               }}
//             >
//               All
//             </Button>
//             <Button
//               onClick={() => setSelectedStatus('accepted')}
//               sx={{
//                 position: 'relative',
//                 color: selectedStatus === 'accepted' ? '#000' : '#666',
//                 fontWeight: selectedStatus === 'accepted' ? 'bold' : 'normal',
//                 minWidth: 'auto',
//                 '&::after': {
//                   content: '""',
//                   position: 'absolute',
//                   left: 0,
//                   bottom: 0,
//                   width: '100%',
//                   height: '2px',
//                   backgroundColor:
//                     selectedStatus === 'accepted' ? 'black' : 'transparent',
//                 },
//               }}
//             >
//               Accepted
//             </Button>
//           </Box>

//           <Divider />

//           {/* Search & Filter Section */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 2,
//               mb: 2,
//               marginTop: '20px',
//             }}
//           >
//             {/* Search Input */}
//             <TextField
//               variant="outlined"
//               size="small"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search..."
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{ minWidth: 250 }}
//             />

//             {/* Type Filter */}
//             <Select
//               displayEmpty
//               size="small"
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               sx={{ width: 150 }}
//             >
//               <MenuItem value="">All Types</MenuItem>
//               <MenuItem value="yearly">Yearly</MenuItem>
//               <MenuItem value="monthly">Monthly</MenuItem>
//             </Select>
//           </Box>

//           {/* Table */}
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Phone Number</TableCell>
//                   <TableCell>Company</TableCell>
//                   <TableCell>Job Title</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell align="right">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {offers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((offer) => (
//                   <TableRow key={offer.id}>
//                     <TableCell>
//                       <span>
//                         {offer.user_name}
//                         <br />
//                         <Typography sx={{ fontSize: '11px', color: 'grey' }}>
//                           {offer.email}
//                         </Typography>
//                       </span>
//                     </TableCell>
//                     <TableCell>{offer.phone}</TableCell>
//                     <TableCell>{offer.company}</TableCell>
//                     <TableCell>{offer.jobTitle}</TableCell>
//                     <TableCell>{offer.type}</TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           display: 'inline-block',
//                           px: 1,
//                           py: 0.5,
//                           fontSize: '10px',
//                           fontWeight: 'bold',
//                           textTransform: 'uppercase',
//                           backgroundColor: getStatusColor(offer.status).bg,
//                           color: getStatusColor(offer.status).text,
//                         }}
//                       >
//                         {offer.status}
//                       </Box>
//                     </TableCell>
//                     <TableCell align="right">
//                       <IconButton color="grey">
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton>
//                         <MoreVertIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//           <TablePagination
//             component="div"
//             count={totalPages * rowsPerPage}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handlePageChange}
//             onRowsPerPageChange={handleRowsPerPageChange}
//             rowsPerPageOptions={[3, 4, 5]}
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// // Function to get status colors
// const getStatusColor = (status: string) => {
//   switch (status) {
//     case 'accepted':
//       return { bg: '#D4EDDA', text: '#155724' }; // Light green background, dark green text
//     case 'pending':
//       return { bg: '#FFF3CD', text: '#856404' }; // Light yellow background, dark yellow text
//     case 'rejected':
//       return { bg: '#F8D7DA', text: '#721C24' }; // Light red background, dark red text
//     default:
//       return { bg: '#E9ECEF', text: '#495057' }; // Default grey
//   }
// };

// export default OffersTable;



'use client';

import { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
  TablePagination,
  InputAdornment,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = 'https://dummy-1.hiublue.com/api/offers';

const OffersTable = () => {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' or 'accepted'
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5); // Default to 5 per page
  const [totalItems, setTotalItems] = useState(0); // This stores the total number of items for pagination

  useEffect(() => {
    fetchOffers();
  }, [search, typeFilter, selectedStatus, page, perPage]);

  const fetchOffers = async () => {
    try {
      let query = `${API_URL}?page=${page + 1}&per_page=${perPage}`; // Page starts from 1 in the query
      if (search) query += `&search=${search}`;
      if (typeFilter) query += `&type=${typeFilter}`;
      if (selectedStatus !== 'all') query += `&status=accepted`;

      const response = await fetch(query, {
        headers: { Authorization: 'Bearer fake-jwt-token' },
      });
      const data = await response.json();
      setOffers(data.data);
      setTotalItems(data.meta.total); // Update totalItems with the total number of offers
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handlePageChange = (_, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setPerPage(event.target.value); // Change the number of rows per page
    setPage(0); // Reset to the first page when per page is changed
  };

  return (
    <Box
      sx={{ width: '1180px', height: 'auto', margin: 'auto', marginBottom:"20px" }}
    >
      <Card sx={{ width: '1180px', height: 'auto' }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Offers Table
          </Typography>

          {/* Status Selection Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={() => setSelectedStatus('all')}
              sx={{
                position: 'relative',
                color: selectedStatus === 'all' ? '#000' : '#666',
                fontWeight: selectedStatus === 'all' ? 'bold' : 'normal',
                minWidth: 'auto',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor:
                    selectedStatus === 'all' ? 'black' : 'transparent',
                },
              }}
            >
              All
            </Button>
            <Button
              onClick={() => setSelectedStatus('accepted')}
              sx={{
                position: 'relative',
                color: selectedStatus === 'accepted' ? '#000' : '#666',
                fontWeight: selectedStatus === 'accepted' ? 'bold' : 'normal',
                minWidth: 'auto',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor:
                    selectedStatus === 'accepted' ? 'black' : 'transparent',
                },
              }}
            >
              Accepted
            </Button>
          </Box>

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
            {/* Search Input */}
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

            {/* Type Filter */}
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
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={totalItems} // Set the total number of items here
            rowsPerPage={perPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[3, 4, 5]} // Options for per page rows
          />
        </CardContent>
      </Card>
    </Box>
  );
};

// Function to get status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'accepted':
      return { bg: '#D4EDDA', text: '#155724' }; // Light green background, dark green text
    case 'pending':
      return { bg: '#FFF3CD', text: '#856404' }; // Light yellow background, dark yellow text
    case 'rejected':
      return { bg: '#F8D7DA', text: '#721C24' }; // Light red background, dark red text
    default:
      return { bg: '#E9ECEF', text: '#495057' }; // Default grey
  }
};

export default OffersTable;
