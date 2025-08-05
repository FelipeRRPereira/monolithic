import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from '../repository/client.model'
import AddClientUseCase from '../usecase/add-client/add-client.usecase'
import ClientRepository from '../repository/client.repository'
import ClientAdmFacade from './client-adm.facade'
import FindClientUseCase from '../usecase/find-client/find-client.usecase'
import ClientAdmFacadeFactory from '../factory/facade.factory'

describe('ClientAdmFacade test', () => {
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

  it('should create a client', async () => {
    const facadeFactory = ClientAdmFacadeFactory.create()

    const input = {
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
    }

    await facadeFactory.add(input)

    const result = await ClientModel.findOne({
      where: { id: input.id },
    })
    const client = result?.toJSON()

    expect(client).toBeDefined()
    expect(client!.name).toEqual(input.name)
    expect(client!.email).toEqual(input.email)
    expect(client!.address).toEqual(input.address)
  })

  it('should find a client', async () => {
    const facadeFactory = ClientAdmFacadeFactory.create()

    const input = {
      id: '123',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      address: '456 Elm St',
    }

    await ClientModel.create({
      id: input.id,
      name: input.name,
      email: input.email,
      address: input.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await facadeFactory.find(input)

    expect(result).toBeDefined()
    expect(result.id).toEqual(input.id)
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.address).toEqual(input.address)
  })
})