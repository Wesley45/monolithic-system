import { UseCaseInterface } from "@shared/usecase/use-case.interface";
import {
  InputShowStoreCatalogFacadeDto,
  OutputListAllStoreCatalogFacadeDto,
  OutputShowStoreCatalogFacadeDto,
  StoreCatalogFacadeInterface,
} from "./store-catalog.facade.interface";

export type UseCaseProps = {
  showProductUseCase: UseCaseInterface | undefined;
  listAllProductsUseCase: UseCaseInterface | undefined;
};

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _showProductUseCase: UseCaseInterface | undefined;
  private _listAllProductsUseCase: UseCaseInterface | undefined;

  constructor(usecasesProps: UseCaseProps) {
    this._showProductUseCase = usecasesProps.showProductUseCase;
    this._listAllProductsUseCase = usecasesProps.listAllProductsUseCase;
  }

  public async find(
    data: InputShowStoreCatalogFacadeDto
  ): Promise<OutputShowStoreCatalogFacadeDto> {
    return this._showProductUseCase?.execute(data);
  }

  public async findAll(): Promise<OutputListAllStoreCatalogFacadeDto> {
    return this._listAllProductsUseCase?.execute({});
  }
}
