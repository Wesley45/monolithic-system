import { Id } from "@shared/domain/value-object/id.value-object";
import { FindClientUseCase } from "./FindClientUseCase";

const input = {
  id: new Id("1"),
  name: "John Smith",
  email: "john@smith.com",
  address: "123 Main Street",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(input)),
  };
};

describe("Find client use case unit test", () => {
  it("should add a client", async () => {
    const clientRepository = MockRepository();

    const addClientUseCase = new FindClientUseCase(clientRepository);
    const client = await addClientUseCase.execute({ id: input.id.id });

    expect(clientRepository.find).toHaveBeenCalled();
    expect(client.id).toEqual(input.id.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
    expect(client.createdAt).toEqual(input.createdAt);
    expect(client.updatedAt).toEqual(input.updatedAt);
  });
});
