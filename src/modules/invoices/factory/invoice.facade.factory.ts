import { InvoiceFacade } from "../facade/invoice.facade";
import { InvoiceRepository } from "../repository/invoice.repository";

import { FindInvoiceUseCase } from "../usecases/findInvoice/FindInvoiceUseCase";
import { GenerateInvoiceUseCase } from "../usecases/generateInvoice/GenerateInvoiceUseCase";

export class InvoiceFacadeFactory {
  public static create(): InvoiceFacade {
    const invoiceRepository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(
      invoiceRepository
    );

    const facade = new InvoiceFacade({
      findInvoiceUseCase,
      generateInvoiceUseCase,
    });

    return facade;
  }
}
