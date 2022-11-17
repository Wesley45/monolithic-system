import { Product } from "@modules/product-admin/domain/product.entity";
import { Id } from "@shared/domain/value-object/id.value-object";

import { CheckStockUseCase } from "./CheckStockUseCase";

const product = new Product({
  id: new Id("1"),
  name: "Product",
  description: "Product description",
  purchasePrice: 100,
  stock: 10,
});

const ProductMockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(
      Promise.resolve({
        productId: product.id.id,
        stock: product.stock,
      })
    ),
  };
};

describe("Check stock use case unit test", () => {
  it("should get stock of a product", async () => {
    const productRepository = ProductMockRepository();
    const checkStockUseCase = new CheckStockUseCase(productRepository);

    const input = {
      productId: "1",
    };

    const response = await checkStockUseCase.execute(input);

    expect(productRepository.find).toHaveBeenCalled();
    expect(response.productId).toEqual(product.id.id);
    expect(response.stock).toEqual(product.stock);
  });
});
