import { Transaction } from "../domain/transaction";

export interface TransactionRepositoryInterface {
  save(transaction: Transaction): Promise<Transaction>;
}
