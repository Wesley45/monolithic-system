import { Id } from "@shared/domain/value-object/id.value-object";
import { Client } from "../domain/client.entity";
import { ClientModel } from "./client.model";
import { ClientRepositoryInterface } from "./client.repository.interface";

export class ClientRepository implements ClientRepositoryInterface {
  public async create(client: Client): Promise<Client> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    });
    return client;
  }

  public async find(id: string): Promise<Client | null> {
    const clientModel = await ClientModel.findOne({ where: { id } });

    if (!clientModel) {
      return null;
    }

    return new Client({
      id: new Id(clientModel.id),
      name: clientModel.name,
      email: clientModel.email,
      address: clientModel.address,
      createdAt: clientModel.createdAt,
      updatedAt: clientModel.updatedAt,
    });
  }
}
