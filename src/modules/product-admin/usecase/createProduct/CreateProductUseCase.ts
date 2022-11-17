import { Product } from "@modules/product-admin/domain/product.entity";
import { ProductRepositoryInterface } from "@modules/product-admin/repository/product.repository.interface";
import { Id } from "@shared/domain/value-object/id.value-object";

import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./CreateProductDto";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(
    data: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    const product = new Product({
      id: new Id(data.id),
      name: data.name,
      description: data.description,
      purchasePrice: data.purchasePrice,
      stock: data.stock,
    });

    await this.productRepository.create(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
