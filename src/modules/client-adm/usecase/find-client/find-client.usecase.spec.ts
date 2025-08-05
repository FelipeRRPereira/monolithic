import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/client.entity'
import FindClientUseCase from './find-client.usecase'

const client = new Client({
  id: new Id('123'),
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  address: '456 Elm St',
})

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
    add: jest.fn(),
  }
}

describe('FindClientUseCase Unit Tests', () => {
  it('should find a client by id', async () => {
    const repository = MockRepository()
    const useCase = new FindClientUseCase(repository)

    const input = {
      id: '123',
    }

    const result = await useCase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toEqual(input.id)
    expect(result.name).toBe(client.name)
    expect(result.email).toBe(client.email)
    expect(result.address).toBe(client.address)
    expect(result.createdAt).toEqual(client.createdAt)
    expect(result.updatedAt).toEqual(client.updatedAt)
  })
})