import { Client } from "@modules/client-admin/domain/client.entity";
import { ClientRepositoryInterface } from "@modules/client-admin/repository/client.repository.interface";
import { Id } from "@shared/domain/value-object/id.value-object";

import { InputAddClientDto, OutputAddClientDto } from "./AddClientUseCase.dto";

export class AddClientUseCase {
  public constructor(private clienteRepository: ClientRepositoryInterface) {}

  public async execute(data: InputAddClientDto): Promise<OutputAddClientDto> {
    const clientModel = new Client({
      id: new Id(data.id) || new Id(),
      name: data.name,
      email: data.email,
      address: data.address,
    });

    const client = await this.clienteRepository.create(clientModel);

    return {
      id: clientModel.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
