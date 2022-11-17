export interface InputCreateProductDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface OutputCreateProductDto {
  id: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
