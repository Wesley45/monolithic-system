import { UseCaseInterface } from "@shared/usecase/use-case.interface";
import {
  InputPaymentFacadeDto,
  OutputPaymentFacadeDto,
  PaymentFacadeInterface,
} from "./payment.facade.interface";

export type UseCaseProps = {
  processPaymentUseCase: UseCaseInterface | undefined;
};

export class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUseCase: UseCaseInterface | undefined;

  constructor({ processPaymentUseCase }: UseCaseProps) {
    this._processPaymentUseCase = processPaymentUseCase;
  }

  public async process(
    data: InputPaymentFacadeDto
  ): Promise<OutputPaymentFacadeDto> {
    return this._processPaymentUseCase?.execute(data);
  }
}
