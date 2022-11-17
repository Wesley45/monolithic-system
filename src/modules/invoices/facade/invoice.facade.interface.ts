export interface InputFindInvoiceFacadeDto {
  id: string;
}

export interface OutputFindInvoiceFacadeDto {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}

export interface InputGenerateInvoiceFacadeDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface OutputGenerateInvoiceFacadeDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

export interface InvoiceFacadeInterface {
  find(data: InputFindInvoiceFacadeDto): Promise<OutputFindInvoiceFacadeDto>;
  generate(
    data: InputGenerateInvoiceFacadeDto
  ): Promise<OutputGenerateInvoiceFacadeDto>;
}
