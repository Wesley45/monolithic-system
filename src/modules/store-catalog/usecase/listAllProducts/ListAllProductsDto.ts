export interface InputListAllProductsDto {}

export interface OutputListAllProductsDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}
