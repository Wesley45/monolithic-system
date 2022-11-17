import { Client } from "../domain/client.entity";

export interface ClientRepositoryInterface {
  create(client: Client): Promise<Client>;
  find(id: string): Promise<Client | null>;
}
