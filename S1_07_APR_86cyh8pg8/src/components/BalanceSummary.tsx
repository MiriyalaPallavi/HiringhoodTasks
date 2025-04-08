 
import { useTransactions } from '../hooks/useTransactions';
import { Card, CardContent, Typography, Stack } from '@mui/material';

export const BalanceSummary = () => {
  const { balance, income, expense } = useTransactions();

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
     
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="subtitle1">Income</Typography>
          <Typography variant="h6" color="green">${income.toFixed(2)}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="subtitle1">Expenses</Typography>
          <Typography variant="h6" color="red">${expense.toFixed(2)}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="subtitle1">Balance</Typography>
          <Typography variant="h6">${balance.toFixed(2)}</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};








