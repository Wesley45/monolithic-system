import { Sequelize } from "sequelize-typescript";

import { TransactionModel } from "../repository/transaction.model";
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecases/processPayment/ProcessPaymentUseCase";
import { PaymentFacade } from "./payment.facade";

describe("Client admin facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a transaction", async () => {
    const transactionRepository = new TransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(
      transactionRepository
    );
    const paymentFacade = new PaymentFacade({ processPaymentUseCase });

    const input = {
      orderId: "1",
      amount: 100,
    };

    const transaction = await paymentFacade.process(input);

    expect(transaction.transactionId).toBeDefined();
    expect(transaction.status).toBe("approved");
    expect(transaction.amount).toBe(input.amount);
    expect(transaction.orderId).toBe(input.orderId);
  });
});
