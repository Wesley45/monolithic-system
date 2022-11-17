import { StoreCatalogFacade } from "../facade/store-catalog.facade";
import { ProductRepository } from "../repository/product.repository";

import { ListAllProductsUseCase } from "../usecase/listAllProducts/ListAllProductsUseCase";
import { ShowProductUseCase } from "../usecase/showProduct/ShowProductUseCase";

export class StoreCatalogFacadeFactory {
  public static create(): StoreCatalogFacade {
    const productRepository = new ProductRepository();
    const listAllProductsUseCase = new ListAllProductsUseCase(
      productRepository
    );
    const showProductUseCase = new ShowProductUseCase(productRepository);

    const facade = new StoreCatalogFacade({
      showProductUseCase,
      listAllProductsUseCase,
    });

    return facade;
  }
}
