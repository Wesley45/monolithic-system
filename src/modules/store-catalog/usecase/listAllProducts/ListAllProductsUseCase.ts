import { ProductRepositoryInterface } from "@modules/store-catalog/repository/product.repository.interface";
import { UseCaseInterface } from "@shared/usecase/use-case.interface";

import { OutputListAllProductsDto } from "./ListAllProductsDto";

export class ListAllProductsUseCase implements UseCaseInterface {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(): Promise<OutputListAllProductsDto> {
    const listProduct = await this.productRepository.findAll();

    const products = listProduct.map((product) => {
      return {
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      };
    });

    return {
      products,
    };
  }
}
