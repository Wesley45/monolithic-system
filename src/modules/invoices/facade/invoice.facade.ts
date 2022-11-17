import { UseCaseInterface } from "@shared/usecase/use-case.interface";
import {
  InputFindInvoiceFacadeDto,
  InputGenerateInvoiceFacadeDto,
  InvoiceFacadeInterface,
  OutputFindInvoiceFacadeDto,
  OutputGenerateInvoiceFacadeDto,
} from "./invoice.facade.interface";

export type UseCaseProps = {
  findInvoiceUseCase: UseCaseInterface | undefined;
  generateInvoiceUseCase: UseCaseInterface | undefined;
};

export class InvoiceFacade implements InvoiceFacadeInterface {
  private _findInvoiceUseCase: UseCaseInterface | undefined;
  private _generateInvoiceUseCase: UseCaseInterface | undefined;

  constructor({ findInvoiceUseCase, generateInvoiceUseCase }: UseCaseProps) {
    this._findInvoiceUseCase = findInvoiceUseCase;
    this._generateInvoiceUseCase = generateInvoiceUseCase;
  }

  public async find(
    data: InputFindInvoiceFacadeDto
  ): Promise<OutputFindInvoiceFacadeDto> {
    return this._findInvoiceUseCase?.execute(data);
  }

  public async generate(
    data: InputGenerateInvoiceFacadeDto
  ): Promise<OutputGenerateInvoiceFacadeDto> {
    return this._generateInvoiceUseCase?.execute(data);
  }
}
