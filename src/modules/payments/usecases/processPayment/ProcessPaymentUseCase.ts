import { Transaction } from "@modules/payments/domain/transaction";
import { TransactionRepositoryInterface } from "@modules/payments/repository/transaction.repository.interface";
import {
  InputProcessPaymentDto,
  OutputProcessPaymentDto,
} from "./ProcessPayment.dto";

export class ProcessPaymentUseCase {
  constructor(private transactionRepository: TransactionRepositoryInterface) {}

  public async execute(
    data: InputProcessPaymentDto
  ): Promise<OutputProcessPaymentDto> {
    const transaction = new Transaction({
      amount: data.amount,
      orderId: data.orderId,
    });

    transaction.process();

    const transactionCreated = await this.transactionRepository.save(
      transaction
    );

    return {
      transactionId: transactionCreated.id.id,
      orderId: transactionCreated.orderId,
      amount: transactionCreated.amount,
      status: transaction.status,
      createdAt: transactionCreated.createdAt,
      updatedAt: transactionCreated.updatedAt,
    };
  }
}
