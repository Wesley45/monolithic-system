import { Product } from "../domain/product.entity";

export interface ProductRepositoryInterface {
  create(product: Product): Promise<void>;
  find(id: string): Promise<Product>;
}
