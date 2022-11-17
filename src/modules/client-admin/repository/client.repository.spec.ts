import { Id } from "@shared/domain/value-object/id.value-object";
import { Sequelize } from "sequelize-typescript";

import { Client } from "../domain/client.entity";
import { ClientModel } from "./client.model";
import { ClientRepository } from "./client.repository";

describe("Client repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new client", async () => {
    const clientRepository = new ClientRepository();

    const client = new Client({
      id: new Id("1"),
      name: "John Smith",
      email: "john@smith.com",
      address: "123 Main Street",
    });

    const clientCreated = await clientRepository.create(client);

    expect(clientCreated.id).toBe(client.id);
    expect(clientCreated.name).toBe(client.name);
    expect(clientCreated.email).toBe(client.email);
    expect(clientCreated.address).toBe(client.address);
    expect(clientCreated.createdAt).toEqual(client.createdAt);
    expect(clientCreated.updatedAt).toEqual(client.updatedAt);
  });

  it("should find a new client", async () => {
    const client = await ClientModel.create({
      id: "2",
      name: "John Smith",
      email: "john@smith.com",
      address: "123 Main Street",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const clientRepository = new ClientRepository();
    const foundClient = await clientRepository.find(client.id);

    expect(foundClient?.id.id).toEqual(client.id);
    expect(foundClient?.name).toEqual(client.name);
    expect(foundClient?.email).toEqual(client.email);
    expect(foundClient?.address).toEqual(client.address);
    expect(foundClient?.createdAt).toEqual(client.createdAt);
    expect(foundClient?.updatedAt).toEqual(client.updatedAt);
  });
});
