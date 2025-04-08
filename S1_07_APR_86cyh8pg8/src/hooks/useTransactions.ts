import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useTransactions = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  const income = transactions.filter(t => t.type === 'Income')
                             .reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.type === 'Expense')
                              .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  return { transactions, income, expense, balance };
};
 
