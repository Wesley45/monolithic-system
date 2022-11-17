import { ProductRepositoryInterface } from "@modules/store-catalog/repository/product.repository.interface";
import { InputShowProductDto, OutputShowProductDto } from "./ShowProductDto";

export class ShowProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(
    data: InputShowProductDto
  ): Promise<OutputShowProductDto> {
    const product = await this.productRepository.find(data.id);

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
