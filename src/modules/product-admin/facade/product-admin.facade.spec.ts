import { Sequelize } from "sequelize-typescript";
import { ProductAdmFacadeFactory } from "../factory/facade.factory";

import { ProductModel } from "../repository/product.model";
import { ProductRepository } from "../repository/product.repository";

import { CreateProductUseCase } from "../usecase/createProduct/CreateProductUseCase";
import { ProductAdminFacade } from "./product-admin.facade";

describe("ProductAdmFacade", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    /* const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const productFacade = new ProductAdminFacade({
      createProductUseCase,
      checkStockUseCase: createProductUseCase,
    }); */

    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    const product = await productFacade.create(input);

    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });

  it("should check product stock", async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };
    await productFacade.create(input);

    const response = await productFacade.checkStock({ productId: input.id });

    expect(response.productId).toBe(input.id);
    expect(response.stock).toBe(input.stock);
  });
});
