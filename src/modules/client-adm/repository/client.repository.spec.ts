import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from './client.model'
import ClientRepository from './client.repository'
import Id from '../../@shared/domain/value-object/id.value-object'
import Client from '../domain/client.entity'

describe('ClientRepository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    
    const result = client.toJSON()

    const repository = new ClientRepository()
    const foundClient = await repository.find(result.id)

    expect(foundClient.id.id).toEqual(result.id)
    expect(foundClient.name).toEqual(result.name)
    expect(foundClient.email).toEqual(result.email)
    expect(foundClient.address).toEqual(result.address)
    expect(foundClient.createdAt).toEqual(result.createdAt)
    expect(foundClient.updatedAt).toEqual(result.updatedAt)
  })

  it('should create a client', async () => {
    const client = new Client({
      id: new Id('123'),
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      address: '456 Elm St',
    })

    const repository = new ClientRepository()
    await repository.add(client)

    const result = await ClientModel.findOne({
      where: { id: client.id.id },
    })
    
    const clientDb = result?.toJSON()

    expect(clientDb).toBeDefined()
    expect(clientDb.id).toEqual(client.id.id)
    expect(clientDb.name).toEqual(client.name)
    expect(clientDb.email).toEqual(client.email)
    expect(clientDb.address).toEqual(client.address)
    expect(clientDb.createdAt).toStrictEqual(client.createdAt)
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt)
  })
})
