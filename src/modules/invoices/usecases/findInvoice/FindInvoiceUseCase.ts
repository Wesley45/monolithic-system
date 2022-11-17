import { InvoiceGatewayInterface } from "@modules/invoices/gateway/invoice.gateway.interface";
import { InputFindInvoiceDTO, OutputFindInvoiceDTO } from "./FindInvoice.dto";

export class FindInvoiceUseCase {
  constructor(private invoiceGateway: InvoiceGatewayInterface) {}

  public async execute(
    data: InputFindInvoiceDTO
  ): Promise<OutputFindInvoiceDTO> {
    const invoice = await this.invoiceGateway.find(data.id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const items = invoice.items.map((item) => ({
      id: item.id.id,
      name: item.name,
      price: item.price,
    }));

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement || "",
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipcode,
      },
      items,
      total: invoice.total(),
      createdAt: invoice.createdAt,
    };
  }
}
