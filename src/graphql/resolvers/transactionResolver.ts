import { transactionModel } from "../../models/transactionModel";

const transactionResolver = {
  Query: {
    ListTransactions: async (_: {}, args: { userId: string }) => {
      try {
        const { userId } = args;
        console.log(userId, 'Fetching transactions for this user ID');
        
        const transactions = await transactionModel.find({ userId });
        
        console.log(transactions, 'Fetched transactions');
        return transactions; 
      } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error("Unable to fetch transactions for the specified user.");
      }
    }
  }
};

export default transactionResolver;
