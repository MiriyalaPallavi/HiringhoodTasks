export interface Transaction {
    id: string;
    title: string;
    amount: number;
    type: 'Income' | 'Expense';
    date: string;
  }
   
