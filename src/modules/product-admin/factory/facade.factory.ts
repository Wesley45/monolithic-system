import { ProductAdminFacade } from "../facade/product-admin.facade";
import { ProductRepository } from "../repository/product.repository";

import { CheckStockUseCase } from "../usecase/checkStock/CheckStockUseCase";
import { CreateProductUseCase } from "../usecase/createProduct/CreateProductUseCase";

export class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);

    const productFacade = new ProductAdminFacade({
      createProductUseCase,
      checkStockUseCase,
    });
    return productFacade;
  }
}
