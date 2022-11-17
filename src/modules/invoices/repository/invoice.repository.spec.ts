import { Sequelize } from "sequelize-typescript";

import { Address } from "@shared/domain/value-object/address.value-object";

import { Invoice, InvoiceId } from "../domain/invoice.entity";
import { Product, ProductId } from "../domain/product.entity";

import { InvoiceModel } from "./invoice.model";
import { InvoiceRepository } from "./invoice.repository";
import { ProductModel } from "./product.model";

describe("Invoice repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([InvoiceModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const address = new Address(
      "123 Main Street",
      "123",
      "00000-000",
      "City",
      "State",
      "Complement"
    );

    const product = new Product({
      id: new ProductId("1"),
      name: "Product 1",
      price: 100.0,
    });

    const product2 = new Product({
      id: new ProductId("2"),
      name: "Product 2",
      price: 200.0,
    });

    const invoiceModel = new Invoice({
      name: "Invoice 1",
      document: "999.999.999-99",
      address,
      items: [product, product2],
    });

    const invoiceRepository = new InvoiceRepository();
    const invoice = await invoiceRepository.create(invoiceModel);

    expect(invoice.id.id).toBeDefined();
    expect(invoice.id.id).toBe(invoiceModel.id.id);
    expect(invoice.name).toBe(invoiceModel.name);
    expect(invoice.document).toBe(invoiceModel.document);
    expect(invoice.address.street).toBe(invoiceModel.address.street);
    expect(invoice.address.number).toBe(invoiceModel.address.number);
    expect(invoice.address.zipcode).toBe(invoiceModel.address.zipcode);
    expect(invoice.address.city).toBe(invoiceModel.address.city);
    expect(invoice.address.state).toBe(invoiceModel.address.state);
    expect(invoice.address.complement).toBe(invoiceModel.address.complement);
    expect(invoice.items.length).toBe(2);
    expect(invoice.items[0].id.id).toBe(product.id.id);
    expect(invoice.items[0].name).toBe(product.name);
    expect(invoice.items[0].price).toBe(product.price);
    expect(invoice.items[1].id.id).toBe(product2.id.id);
    expect(invoice.items[1].name).toBe(product2.name);
    expect(invoice.items[1].price).toBe(product2.price);
  });

  it("should find a invoice", async () => {
    const address = new Address(
      "123 Main Street",
      "123",
      "00000-000",
      "City",
      "State",
      "Complement"
    );

    const product = new Product({
      id: new ProductId("1"),
      name: "Product 1",
      price: 100.0,
    });

    const product2 = new Product({
      id: new ProductId("2"),
      name: "Product 2",
      price: 200.0,
    });

    const invoiceModel = new Invoice({
      id: new InvoiceId("1"),
      name: "Invoice 1",
      document: "999.999.999-99",
      address,
      items: [product, product2],
    });

    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.create(invoiceModel);

    const invoice = await invoiceRepository.find(invoiceModel.id.id);

    expect(invoice?.id.id).toBe(invoiceModel.id.id);
    expect(invoice).toStrictEqual(invoiceModel);
  });
});
