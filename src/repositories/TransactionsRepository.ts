import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const balance = this.getBalance();

    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (acumullated, transaction) =>
        transaction.type === 'income'
          ? acumullated + transaction.value
          : acumullated + 0,
      0,
    );
    const outcome = this.transactions.reduce(
      (acumullated, transaction) =>
        transaction.type === 'outcome'
          ? acumullated + transaction.value
          : acumullated + 0,
      0,
    );

    const total = income - outcome;

    const balance = { income, outcome, total };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
