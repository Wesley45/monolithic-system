import { Invoice } from "@modules/invoices/domain/invoice.entity";
import { Product, ProductId } from "@modules/invoices/domain/product.entity";
import { Address } from "@shared/domain/value-object/address.value-object";
import { GenerateInvoiceUseCase } from "./GenerateInvoiceUseCase";

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
  name: "Invoice 1",
  document: "999.999.999-99",
  address,
  items: [product, product2],
});

const InvoiceRepository = () => {
  return {
    create: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    find: jest.fn(),
  };
};

describe("Generate invoice usecase unit test", () => {
  it("should generate a invoice", async () => {
    const invoiceRepository = InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(
      invoiceRepository
    );

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

    const response = await generateInvoiceUseCase.execute(input);

    expect(invoiceRepository.create).toHaveBeenCalled();
    expect(response.id).toBeDefined();
    expect(response.name).toBe(invoice.name);
    expect(response.document).toBe(invoice.document);
    expect(response.street).toBe(invoice.address.street);
    expect(response.number).toBe(invoice.address.number);
    expect(response.complement).toBe(invoice.address.complement);
    expect(response.city).toBe(invoice.address.city);
    expect(response.state).toBe(invoice.address.state);
    expect(response.zipCode).toBe(invoice.address.zipcode);
    expect(response.items).toEqual(input.items);
    expect(response.total).toBe(300.0);
  });
});
