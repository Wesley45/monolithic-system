import { Sequelize } from "sequelize-typescript";

import { Id } from "@shared/domain/value-object/id.value-object";

import { Product } from "../domain/product.entity";
import { ProductModel } from "./product.model";
import { ProductRepository } from "./product.repository";

describe("Product repository test", () => {
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
    const productRepository = new ProductRepository();

    const productModel = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await productRepository.create(productModel);

    const productDb = await ProductModel.findOne({
      where: { id: productModel.id.id },
    });

    expect(productModel.id.id).toEqual(productDb?.id);
    expect(productModel.name).toEqual(productDb?.name);
    expect(productModel.description).toEqual(productDb?.description);
    expect(productModel.purchasePrice).toEqual(productDb?.purchasePrice);
    expect(productModel.stock).toEqual(productDb?.stock);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    const productModel = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await productRepository.create(productModel);

    const product = await productRepository.find(productModel.id.id);

    expect(product.id).toEqual(productModel.id);
    expect(product.id.id).toBe(productModel.id.id);
    expect(product.name).toBe(productModel.name);
    expect(product.description).toBe(productModel.description);
    expect(product.purchasePrice).toBe(productModel.purchasePrice);
    expect(product.stock).toBe(productModel.stock);
  });
});
