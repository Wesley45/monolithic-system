import { Sequelize } from "sequelize-typescript";

import { ClientModel } from "../repository/client.model";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../usecases/addClient/AddClientUseCase";
import { FindClientUseCase } from "../usecases/findClient/FindClientUseCase";
import { ClientAdminFacade } from "./client-admin.facade";

describe("Client admin facade test", () => {
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
    const repository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdminFacade({
      addClientUseCase,
      findClientUseCase: undefined,
    });

    const input = {
      id: "1",
      name: "John Smith",
      email: "john@smith.com",
      address: "123 Main Street",
    };

    const client = await facade.create(input);

    expect(client.id).toBeDefined();
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });

  it("should find a client", async () => {
    const repository = new ClientRepository();
    const findClientUseCase = new FindClientUseCase(repository);
    const facade = new ClientAdminFacade({
      addClientUseCase: undefined,
      findClientUseCase,
    });

    const input = {
      id: "2",
      name: "John Smith",
      email: "john@smith.com",
      address: "123 Main Street",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ClientModel.create(input);

    const client = await facade.find({ id: input.id });

    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
    expect(client.createdAt).toEqual(input.createdAt);
    expect(client.updatedAt).toEqual(input.updatedAt);
  });
});
