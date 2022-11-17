import { CreateProductUseCase } from "./CreateProductUseCase";

const productCreated = {
  id: "1",
  name: "Product 1",
  description: "Product 1 description",
  purchasePrice: 100,
  stock: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(productCreated),
  };
};

describe("Create product use case unit test", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);

    const product = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    const response = await createProductUseCase.execute(product);

    expect(productRepository.create).toHaveBeenCalled();
    expect(response.id).toBeDefined();
    expect(response.name).toBe(product.name);
    expect(response.description).toBe(product.description);
    expect(response.purchasePrice).toBe(product.purchasePrice);
    expect(response.stock).toBe(product.stock);
  });
});
