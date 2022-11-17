import { Id } from "@shared/domain/value-object/id.value-object";
import { Product } from "@modules/store-catalog/domain/product.entity";
import { ShowProductUseCase } from "@modules/store-catalog/usecase/showProduct/ShowProductUseCase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Product description 1",
  salesPrice: 100,
});

const ProductRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  };
};

describe("Show a product usecase unit test", () => {
  it("should show a product", async () => {
    const productRepository = ProductRepository();
    const showProductUseCase = new ShowProductUseCase(productRepository);

    const foundProduct = await showProductUseCase.execute({
      id: product.id.id,
    });

    expect(productRepository.find).toHaveBeenCalled();
    expect(foundProduct.id).toBe(product.id.id);
    expect(foundProduct.name).toBe(product.name);
    expect(foundProduct.description).toBe(product.description);
    expect(foundProduct.salesPrice).toBe(product.salesPrice);
  });
});
