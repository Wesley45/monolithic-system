import { ProductRepositoryInterface } from "@modules/product-admin/repository/product.repository.interface";
import { InputCheckStockDto, OutputCheckStockDto } from "./CheckStockDto";

export class CheckStockUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(data: InputCheckStockDto): Promise<OutputCheckStockDto> {
    const product = await this.productRepository.find(data.productId);

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      productId: data.productId,
      stock: product.stock,
    };
  }
}
