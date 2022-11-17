import { Transaction } from "../domain/transaction";
import { TransactionModel } from "./transaction.model";
import { TransactionRepositoryInterface } from "./transaction.repository.interface";

export class TransactionRepository implements TransactionRepositoryInterface {
  public async save(transaction: Transaction): Promise<Transaction> {
    await TransactionModel.create({
      id: transaction.id.id,
      amount: transaction.amount,
      orderId: transaction.orderId,
      status: transaction.status,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    });
    return transaction;
  }
}
