import { UseCaseInterface } from "@shared/usecase/use-case.interface";

import { InputCheckStockDto, OutputCheckStockDto } from "../dtos/CheckStockDto";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "../dtos/CreateProductDto";
import { ProductAdminFacadeInterface } from "./product-admin.facade.interface";

export type UseCaseProps = {
  createProductUseCase: UseCaseInterface | undefined;
  checkStockUseCase: UseCaseInterface | undefined;
};

export class ProductAdminFacade implements ProductAdminFacadeInterface {
  private _createProductUseCase: UseCaseInterface | undefined;
  private _checkStockUseCase: UseCaseInterface | undefined;

  constructor(usecasesProps: UseCaseProps) {
    this._createProductUseCase = usecasesProps.createProductUseCase;
    this._checkStockUseCase = usecasesProps.checkStockUseCase;
  }

  public async create(
    data: InputCreateProductDto
  ): Promise<OutputCreateProductDto> {
    return this._createProductUseCase?.execute(data);
  }

  public async checkStock(
    data: InputCheckStockDto
  ): Promise<OutputCheckStockDto> {
    return this._checkStockUseCase?.execute(data);
  }
}
