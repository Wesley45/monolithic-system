import { PaymentFacade } from "../facade/payment.facade";
import { PaymentFacadeInterface } from "../facade/payment.facade.interface";
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecases/processPayment/ProcessPaymentUseCase";

export class PaymentFacadeFactory {
  static create(): PaymentFacadeInterface {
    const transactionRepository = new TransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(
      transactionRepository
    );
    const paymentFacade = new PaymentFacade({ processPaymentUseCase });
    return paymentFacade;
  }
}
