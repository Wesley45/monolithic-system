import { Sequelize } from "sequelize-typescript";
import { StoreCatalogFacadeFactory } from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";

describe("Store catalog facade test", () => {
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

  it("should find a product", async () => {
    const facade = StoreCatalogFacadeFactory.create();
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product description 1",
      salesPrice: 100,
    });

    const result = await facade.find({ id: "1" });

    expect(result.id).toBe("1");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Product description 1");
    expect(result.salesPrice).toBe(100);
  });

  it("should find all products", async () => {
    const facade = StoreCatalogFacadeFactory.create();
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product description 1",
      salesPrice: 100,
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Product description 2",
      salesPrice: 200,
    });

    const { products } = await facade.findAll();

    expect(products.length).toBe(2);

    expect(products[0].id).toBe("1");
    expect(products[0].name).toBe("Product 1");
    expect(products[0].description).toBe("Product description 1");
    expect(products[0].salesPrice).toBe(100);

    expect(products[1].id).toBe("2");
    expect(products[1].name).toBe("Product 2");
    expect(products[1].description).toBe("Product description 2");
    expect(products[1].salesPrice).toBe(200);
  });
});
