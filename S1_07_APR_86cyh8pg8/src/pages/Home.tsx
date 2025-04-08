import { Container, Typography } from '@mui/material';
import { BalanceSummary } from '../components/BalanceSummary';
//import BalanceCard from '../components/BalanceCard';
import { TransactionList } from '../components/TransactionList';

export const Home = () => {
  return (
    <Container>
      <Typography variant="h4" mt={3}>Dashboard</Typography>
      <BalanceSummary />
     
      <TransactionList />
    </Container>
  );
};


export default Home;
