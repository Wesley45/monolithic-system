import { UseCaseInterface } from "@shared/usecase/use-case.interface";

import {
  ClientAdminFacadeInterface,
  InputAddClientFacadeDto,
  InputFindClientFacadeDto,
  OutputAddClientFacadeDto,
  OutputFindClientFacadeDto,
} from "./client-admin.facade.interface";

export type UseCaseProps = {
  addClientUseCase: UseCaseInterface | undefined;
  findClientUseCase: UseCaseInterface | undefined;
};

export class ClientAdminFacade implements ClientAdminFacadeInterface {
  private _addClientUseCase: UseCaseInterface | undefined;
  private _findClientUseCase: UseCaseInterface | undefined;

  constructor(usecasesProps: UseCaseProps) {
    this._addClientUseCase = usecasesProps.addClientUseCase;
    this._findClientUseCase = usecasesProps.findClientUseCase;
  }

  public async create(
    data: InputAddClientFacadeDto
  ): Promise<OutputAddClientFacadeDto> {
    return this._addClientUseCase?.execute(data);
  }

  public async find(
    data: InputFindClientFacadeDto
  ): Promise<OutputFindClientFacadeDto> {
    return this._findClientUseCase?.execute(data);
  }
}
