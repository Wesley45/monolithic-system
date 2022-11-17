import { Sequelize } from "sequelize-typescript";

import { Id } from "@shared/domain/value-object/id.value-object";
import { Transaction } from "../domain/transaction";
import { TransactionModel } from "./transaction.model";
import { TransactionRepository } from "./transaction.repository";

describe("Client repository unit test", () => {
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

  it("should save a transaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "1",
    });
    transaction.approve();

    const transactionRepository = new TransactionRepository();
    const transactionCreated = await transactionRepository.save(transaction);

    expect(transactionCreated.id).toBe(transaction.id);
    expect(transactionCreated.status).toBe(transaction.status);
    expect(transactionCreated.amount).toBe(transaction.amount);
    expect(transactionCreated.orderId).toBe(transaction.orderId);
  });
});
