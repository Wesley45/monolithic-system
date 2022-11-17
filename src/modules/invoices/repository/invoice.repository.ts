import { Address } from "@shared/domain/value-object/address.value-object";
import { Invoice, InvoiceId } from "../domain/invoice.entity";
import { Product, ProductId } from "../domain/product.entity";
import { InvoiceGatewayInterface } from "../gateway/invoice.gateway.interface";

import { InvoiceModel } from "./invoice.model";
import { ProductModel } from "./product.model";

export class InvoiceRepository implements InvoiceGatewayInterface {
  public async create(data: Invoice): Promise<Invoice> {
    await InvoiceModel.create(
      {
        id: data.id.id,
        total: data.total(),
        name: data.name,
        document: data.document,
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement,
        city: data.address.city,
        state: data.address.state,
        zipcode: data.address.zipcode,
        items: data.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      { include: [{ model: ProductModel }] }
    );
    return data;
  }

  public async find(id: string): Promise<Invoice | null> {
    const invoiceModel = await InvoiceModel.findOne({
      where: {
        id,
      },
      include: [{ model: ProductModel }],
    });

    if (!invoiceModel) {
      return null;
    }

    let items: Product[] = [];

    if (invoiceModel.items.length > 0) {
      items = invoiceModel.items.map((item) => {
        return new Product({
          id: new ProductId(item.id),
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      });
    }

    const address = new Address(
      invoiceModel.street,
      invoiceModel.number,
      invoiceModel.zipcode,
      invoiceModel.city,
      invoiceModel.state,
      invoiceModel.complement
    );

    const invoice = new Invoice({
      id: new InvoiceId(invoiceModel.id),
      name: invoiceModel.name,
      document: invoiceModel.document,
      address,
      items,
      createdAt: invoiceModel.createdAt,
      updatedAt: invoiceModel.updatedAt,
    });

    return invoice;
  }
}
