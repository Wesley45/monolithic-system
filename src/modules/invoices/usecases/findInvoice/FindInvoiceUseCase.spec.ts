import { Invoice, InvoiceId } from "@modules/invoices/domain/invoice.entity";
import { Product, ProductId } from "@modules/invoices/domain/product.entity";
import { Address } from "@shared/domain/value-object/address.value-object";
import { FindInvoiceUseCase } from "./FindInvoiceUseCase";

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

const invoice = new Invoice({
  id: new InvoiceId("1"),
  name: "Invoice 1",
  document: "999.999.999-99",
  address,
  items: [product, product2],
});

const InvoiceRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find invoice usecase unit test", () => {
  it("should find a invoice", async () => {
    const invoiceRepository = InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      name: invoice.name,
      document: invoice.document,
      street: address.street,
      number: address.number,
      complement: address.complement || "",
      city: address.city,
      state: address.state,
      zipCode: address.zipcode,
      items: [
        { id: product.id.id, name: product.name, price: product.price },
        { id: product2.id.id, name: product2.name, price: product2.price },
      ],
    };

    const response = await findInvoiceUseCase.execute({ id: invoice.id.id });

    expect(invoiceRepository.find).toHaveBeenCalled();
    expect(response.id).toBeDefined();
    expect(response.id).toBe(invoice.id.id);
    expect(response.name).toBe(invoice.name);
    expect(response.document).toBe(invoice.document);
    expect(response.address.street).toBe(invoice.address.street);
    expect(response.address.number).toBe(invoice.address.number);
    expect(response.address.complement).toBe(invoice.address.complement);
    expect(response.address.city).toBe(invoice.address.city);
    expect(response.address.state).toBe(invoice.address.state);
    expect(response.address.zipCode).toBe(invoice.address.zipcode);
    expect(response.items).toEqual(input.items);
    expect(response.total).toBe(300.0);
    expect(response.createdAt).toBe(response.createdAt);
  });

  it("should throw an error when invoice is not exist", () => {
    const invoiceRepository = InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);

    invoiceRepository.find.mockImplementation(() => {
      throw new Error("Invoice not found");
    });

    const input = {
      id: "456ABC",
    };

    expect(async () => {
      return await findInvoiceUseCase.execute(input);
    }).rejects.toThrow("Invoice not found");
  });
});
