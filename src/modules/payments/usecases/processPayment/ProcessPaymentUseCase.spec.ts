import {
  Transaction,
  TransactionId,
} from "@modules/payments/domain/transaction";
import { ProcessPaymentUseCase } from "./ProcessPaymentUseCase";

const approvedTransaction = new Transaction({
  id: new TransactionId("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const ApprovedTransactionRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(approvedTransaction)),
  };
};

const declinedTransaction = new Transaction({
  id: new TransactionId("2"),
  orderId: "2",
  amount: 50.0,
  status: "declined",
});

const DeclinedTransactionRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(declinedTransaction)),
  };
};

describe("Process payment usecase unit test", () => {
  it("should approve a transaction", async () => {
    const transactionRepository = ApprovedTransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(
      transactionRepository
    );

    const input = {
      orderId: "1",
      amount: 100,
    };

    const response = await processPaymentUseCase.execute(input);

    expect(transactionRepository.save).toHaveBeenCalled();
    expect(response.transactionId).toBe(approvedTransaction.id.id);
    expect(response.status).toBe(approvedTransaction.status);
    expect(response.orderId).toBe(approvedTransaction.orderId);
    expect(response.amount).toBe(approvedTransaction.amount);
  });

  it("should decline a transaction", async () => {
    const transactionRepository = DeclinedTransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(
      transactionRepository
    );

    const input = {
      orderId: "2",
      amount: 50.0,
    };

    const response = await processPaymentUseCase.execute(input);
    expect(transactionRepository.save).toHaveBeenCalled();
    expect(response.transactionId).toBe(declinedTransaction.id.id);
    expect(response.status).toBe(declinedTransaction.status);
    expect(response.orderId).toBe(declinedTransaction.orderId);
    expect(response.amount).toBe(declinedTransaction.amount);
  });
});
