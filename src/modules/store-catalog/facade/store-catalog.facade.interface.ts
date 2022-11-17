export interface InputShowStoreCatalogFacadeDto {
  id: string;
}

export interface OutputShowStoreCatalogFacadeDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface OutputListAllStoreCatalogFacadeDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export interface StoreCatalogFacadeInterface {
  find(
    data: InputShowStoreCatalogFacadeDto
  ): Promise<OutputShowStoreCatalogFacadeDto>;
  findAll(): Promise<OutputListAllStoreCatalogFacadeDto>;
}
