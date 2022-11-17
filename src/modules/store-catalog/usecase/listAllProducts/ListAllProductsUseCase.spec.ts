import { Id } from "@shared/domain/value-object/id.value-object";
import { Product } from "@modules/store-catalog/domain/product.entity";
import { ListAllProductsUseCase } from "@modules/store-catalog/usecase/listAllProducts/ListAllProductsUseCase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product description 1",
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  description: "Product description 2",
  salesPrice: 200,
});

const ProductRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    find: jest.fn(),
  };
};

describe("List all products usecase unit test", () => {
  it("should list all products", async () => {
    const productRepository = ProductRepository();
    const listAllProductsUseCase = new ListAllProductsUseCase(
      productRepository
    );

    const { products } = await listAllProductsUseCase.execute();

    expect(products.length).toBe(2);
    expect(productRepository.findAll).toHaveBeenCalled();

    expect(products[0].id).toBe(product.id.id);
    expect(products[0].name).toBe(product.name);
    expect(products[0].description).toBe(product.description);
    expect(products[0].salesPrice).toBe(product.salesPrice);

    expect(products[1].id).toBe(product2.id.id);
    expect(products[1].name).toBe(product2.name);
    expect(products[1].description).toBe(product2.description);
    expect(products[1].salesPrice).toBe(product2.salesPrice);
  });
});
