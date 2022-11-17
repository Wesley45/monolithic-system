import { Sequelize } from "sequelize-typescript";

import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceRepository } from "../repository/invoice.repository";
import { ProductModel } from "../repository/product.model";
import { FindInvoiceUseCase } from "../usecases/findInvoice/FindInvoiceUseCase";
import { GenerateInvoiceUseCase } from "../usecases/generateInvoice/GenerateInvoiceUseCase";
import { InvoiceFacade } from "./invoice.facade";

describe("Invoice facade test", () => {
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

  it("should generate a invoice", async () => {
    const invoiceRepository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(
      invoiceRepository
    );
    const invoiceFacade = new InvoiceFacade({
      generateInvoiceUseCase,
      findInvoiceUseCase: undefined,
    });

    const input = {
      name: "Invoice 1",
      document: "999.999.999-99",
      street: "123 Main Street",
      number: "123",
      complement: "Complement",
      city: "City",
      state: "State",
      zipCode: "00000-000",
      items: [
        { id: "1", name: "Product 1", price: 100.0 },
        { id: "2", name: "Product 2", price: 200.0 },
      ],
    };

    const invoice = await invoiceFacade.generate(input);

    expect(invoice.id).toBeDefined();
    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.street).toBe(input.street);
    expect(invoice.number).toBe(input.number);
    expect(invoice.complement).toBe(input.complement);
    expect(invoice.city).toBe(input.city);
    expect(invoice.state).toBe(input.state);
    expect(invoice.zipCode).toBe(input.zipCode);
    expect(invoice.items).toEqual(input.items);
    expect(invoice.total).toBe(300.0);
  });

  it("should find a invoice", async () => {
    const invoiceRepository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(
      invoiceRepository
    );
    const invoiceFacade = new InvoiceFacade({
      findInvoiceUseCase,
      generateInvoiceUseCase,
    });

    const input = {
      name: "Invoice 1",
      document: "999.999.999-99",
      street: "123 Main Street",
      number: "123",
      complement: "Complement",
      city: "City",
      state: "State",
      zipCode: "00000-000",
      items: [
        { id: "1", name: "Product 1", price: 100.0 },
        { id: "2", name: "Product 2", price: 200.0 },
      ],
    };

    const invoiceCreated = await invoiceFacade.generate(input);

    expect(invoiceCreated.id).toBeDefined();
    expect(invoiceCreated.name).toBe(input.name);
    expect(invoiceCreated.document).toBe(input.document);
    expect(invoiceCreated.street).toBe(input.street);
    expect(invoiceCreated.number).toBe(input.number);
    expect(invoiceCreated.complement).toBe(input.complement);
    expect(invoiceCreated.city).toBe(input.city);
    expect(invoiceCreated.state).toBe(input.state);
    expect(invoiceCreated.zipCode).toBe(input.zipCode);
    expect(invoiceCreated.items).toEqual(input.items);
    expect(invoiceCreated.total).toBe(300.0);

    const invoice = await invoiceFacade.find({ id: invoiceCreated.id });

    expect(invoice.id).toBe(invoiceCreated.id);
    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.address.street).toBe(input.street);
    expect(invoice.address.number).toBe(input.number);
    expect(invoice.address.complement).toBe(input.complement);
    expect(invoice.address.city).toBe(input.city);
    expect(invoice.address.state).toBe(input.state);
    expect(invoice.address.zipCode).toBe(input.zipCode);
    expect(invoice.items).toEqual(input.items);
    expect(invoice.total).toBe(300.0);
  });
});
