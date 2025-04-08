

// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { deleteTransaction } from '../redux/transactionSlice';
// import { useTransactions } from '../hooks/useTransactions';
// import { useNavigate } from 'react-router-dom';

// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Stack,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
//   InputLabel,
//   FormControl,
//   Tooltip,
// } from '@mui/material';

// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { motion, AnimatePresence } from 'framer-motion';

// export const TransactionList = () => {
//   const dispatch = useDispatch();
//   const { transactions } = useTransactions();
//   const navigate = useNavigate();

//   const [sortBy, setSortBy] = useState<'date' | 'type'>('date');

//   const handleChange = (e: SelectChangeEvent) => {
//     setSortBy(e.target.value as 'date' | 'type');
//   };

//   const sortedTransactions = [...transactions].sort((a, b) => {
//     if (sortBy === 'date') {
//       return new Date(b.date).getTime() - new Date(a.date).getTime();
//     }
//     return a.type.localeCompare(b.type);
//   });

//   return (
//     <>
//       <FormControl fullWidth sx={{ mt: 3 }}>
//         <InputLabel>Sort By</InputLabel>
//         <Select value={sortBy} label="Sort By" onChange={handleChange}>
//           <MenuItem value="date">Date</MenuItem>
//           <MenuItem value="type">Type</MenuItem>
//         </Select>
//       </FormControl>

//       <Stack spacing={2} mt={3}>
//         <AnimatePresence>
//           {sortedTransactions.map((txn) => (
//             <motion.div
//               key={txn.id}
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.3 }}
//             >
//               <Card
//                 variant="outlined"
//                 sx={{
//                   borderLeft: `6px solid ${txn.type === 'Income' ? '#2e7d32' : '#c62828'}`,
//                   backgroundColor: txn.type === 'Income' ? '#e8f5e9' : '#ffebee',
//                 }}
//               >
//                 <CardContent sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//                   <div>
//                     <Typography variant="h6">{txn.title}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {new Date(txn.date).toLocaleDateString()}
//                     </Typography>
//                   </div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                     <Typography
//                       variant="h6"
//                       sx={{ color: txn.type === 'Income' ? 'green' : 'red' }}
//                     >
//                       {txn.type === 'Expense' ? '-' : '+'}${Math.abs(txn.amount).toFixed(2)}
//                     </Typography>
//                     <Tooltip title="Edit">
//                       <IconButton
//                         onClick={() => navigate(`/add/${txn.id}`)}
//                         aria-label="Edit Transaction"
//                         color="primary"
//                       >
//                         <EditIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                       <IconButton
//                         onClick={() => dispatch(deleteTransaction(txn.id))}
//                         aria-label="Delete Transaction"
//                         color="error"
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Tooltip>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </Stack>
//     </>
//   );
// };


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../redux/transactionSlice';
import { useTransactions } from '../hooks/useTransactions';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  Tooltip,
  useTheme,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionList = () => {
  const dispatch = useDispatch();
  const { transactions } = useTransactions();
  const navigate = useNavigate();
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === 'dark';

  const [sortBy, setSortBy] = useState<'date' | 'type'>('date');

  const handleChange = (e: SelectChangeEvent) => {
    setSortBy(e.target.value as 'date' | 'type');
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.type.localeCompare(b.type);
  });

  return (
    <>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} label="Sort By" onChange={handleChange}>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="type">Type</MenuItem>
        </Select>
      </FormControl>

      <Stack spacing={2} mt={3}>
        <AnimatePresence>
          {sortedTransactions.map((txn) => {
            const bgColor = isDarkMode
              ? txn.type === 'Income'
                ? '#1e4620' // dark green
                : '#4a1c1c' // dark red
              : txn.type === 'Income'
              ? '#e8f5e9'
              : '#ffebee';

            const textColor = isDarkMode ? '#ffffff' : txn.type === 'Income' ? '#2e7d32' : '#c62828';

            return (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    borderLeft: `6px solid ${txn.type === 'Income' ? '#2e7d32' : '#c62828'}`,
                    backgroundColor: bgColor,
                    color: isDarkMode ? '#fff' : 'inherit',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <Typography variant="h6">{txn.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(txn.date).toLocaleDateString()}
                      </Typography>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Typography variant="h6" sx={{ color: textColor }}>
                        {txn.type === 'Expense' ? '-' : '+'}${Math.abs(txn.amount).toFixed(2)}
                      </Typography>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => navigate(`/add/${txn.id}`)}
                          aria-label="Edit Transaction"
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => dispatch(deleteTransaction(txn.id))}
                          aria-label="Delete Transaction"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </Stack>
    </>
  );
};

