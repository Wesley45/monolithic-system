export interface InputAddClientFacadeDto {
  id?: string;
  name: string;
  email: string;
  address: string;
}

export interface OutputAddClientFacadeDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InputFindClientFacadeDto {
  id: string;
}

export interface OutputFindClientFacadeDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientAdminFacadeInterface {
  create(data: InputAddClientFacadeDto): Promise<OutputAddClientFacadeDto>;
  find(data: InputFindClientFacadeDto): Promise<OutputFindClientFacadeDto>;
}
