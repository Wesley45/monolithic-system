import { Invoice } from "@modules/invoices/domain/invoice.entity";
import { Product, ProductId } from "@modules/invoices/domain/product.entity";
import { InvoiceGatewayInterface } from "@modules/invoices/gateway/invoice.gateway.interface";
import { Address } from "@shared/domain/value-object/address.value-object";
import {
  InputGenerateInvoiceDto,
  OutputGenerateInvoiceDto,
} from "./GenerateInvoice.dto";

export class GenerateInvoiceUseCase {
  constructor(private invoiceGateway: InvoiceGatewayInterface) {}

  public async execute(
    data: InputGenerateInvoiceDto
  ): Promise<OutputGenerateInvoiceDto> {
    const address = new Address(
      data.street,
      data.number,
      data.zipCode,
      data.city,
      data.state,
      data.complement
    );

    const items = data.items.map(
      (item) =>
        new Product({
          id: new ProductId(item.id),
          name: item.name,
          price: item.price,
        })
    );

    const invoice = new Invoice({
      name: data.name,
      document: data.document,
      address,
      items,
    });

    await this.invoiceGateway.create(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement || "",
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipcode,
      items: data.items,
      total: invoice.total(),
    };
  }
}
