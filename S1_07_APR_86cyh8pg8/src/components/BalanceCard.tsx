import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Card, CardContent, Typography, Stack } from '@mui/material';

const BalanceCard = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const balance = transactions.reduce((acc, txn) => {
    return txn.type === 'Income' ? acc + txn.amount : acc - txn.amount;
  }, 0);

  const income = transactions
    .filter(txn => txn.type === 'Income')
    .reduce((acc, txn) => acc + txn.amount, 0);

  const expenses = transactions
    .filter(txn => txn.type === 'Expense')
    .reduce((acc, txn) => acc + txn.amount, 0);

  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Balance: ₹{balance.toFixed(2)}
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography color="green">Income: ₹{income.toFixed(2)}</Typography>
          <Typography color="red">Expenses: ₹{expenses.toFixed(2)}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;

