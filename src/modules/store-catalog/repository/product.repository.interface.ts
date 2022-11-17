import { Product } from "../domain/product.entity";

export interface ProductRepositoryInterface {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
}
