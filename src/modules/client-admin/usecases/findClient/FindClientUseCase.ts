import { ClientRepositoryInterface } from "@modules/client-admin/repository/client.repository.interface";
import { InputFindClientDto, OutputFindClientDto } from "./FindClient.dto";

export class FindClientUseCase {
  public constructor(private clienteRepository: ClientRepositoryInterface) {}

  public async execute({
    id,
  }: InputFindClientDto): Promise<OutputFindClientDto> {
    const client = await this.clienteRepository.find(id);

    if (!client) {
      throw new Error("Client not found");
    }

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
