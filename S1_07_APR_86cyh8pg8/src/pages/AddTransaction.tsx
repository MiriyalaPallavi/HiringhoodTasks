

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  TextField,
  Button,
  MenuItem,
  Stack,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, updateTransaction } from '../redux/transactionSlice';
import { RootState } from '../redux/store';
import { v4 as uuidv4 } from 'uuid';

type TransactionType = 'Income' | 'Expense';

interface FormValues {
  title: string;
  amount: string;
  type: TransactionType;
  date: string;
}

export const AddTransaction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const editingTxn = transactions.find((txn) => txn.id === id);

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      amount: '',
      type: 'Income',
      date: new Date().toISOString().split('T')[0],
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      amount: Yup.number().typeError('Must be a number').required('Required'),
      type: Yup.string().oneOf(['Income', 'Expense']).required(),
      date: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      const payload = {
        id: editingTxn ? editingTxn.id : uuidv4(),
        title: values.title,
        amount: +values.amount,
        type: values.type as TransactionType,
        date: values.date,
      };

      if (editingTxn) {
        dispatch(updateTransaction(payload));
      } else {
        dispatch(addTransaction(payload));
      }
      navigate('/');
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (editingTxn) {
      formik.setValues({
        title: editingTxn.title,
        amount: editingTxn.amount.toString(),
        type: editingTxn.type,
        date: editingTxn.date,
      });
    }
  }, [editingTxn]);

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper
        elevation={4}
        sx={{ p: 4, width: '100%', maxWidth: 500, borderRadius: 3 }}
      >
        <Typography variant="h5" mb={3} textAlign="center">
          {editingTxn ? 'Edit Transaction' : 'Add Transaction'}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              label="Amount"
              name="amount"
              fullWidth
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
            <TextField
              select
              label="Type"
              name="type"
              fullWidth
              value={formik.values.type}
              onChange={formik.handleChange}
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </TextField>
            <TextField
              type="date"
              label="Date"
              name="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {editingTxn ? 'Update' : 'Add'}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
