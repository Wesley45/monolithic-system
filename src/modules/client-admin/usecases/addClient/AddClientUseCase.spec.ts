import { AddClientUseCase } from "./AddClientUseCase";

const input = {
  name: "John Smith",
  email: "john@smith.com",
  address: "123 Main Street",
};

const MockRepository = () => {
  return {
    create: jest.fn().mockReturnValue(Promise.resolve(input)),
    find: jest.fn(),
  };
};

describe("Add client use case unit test", () => {
  it("should add a client", async () => {
    const clientRepository = MockRepository();

    const addClientUseCase = new AddClientUseCase(clientRepository);
    const client = await addClientUseCase.execute(input);

    expect(clientRepository.create).toHaveBeenCalled();
    expect(client.id).toBeDefined();
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });
});
