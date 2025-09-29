import Address from '../../@shared/domain/value-object/address'
import Id from '../../@shared/domain/value-object/id.value-object'
import Client from '../domain/client.entity'
import ClientGatewayInterface from '../gateway/client.gateway'
import { ClientModel } from './client.model'

export default class ClientRepository implements ClientGatewayInterface {
  async add(entity: Client): Promise<void> {
    await ClientModel.create({
      id: entity.id.id,
      name: entity.name,
      email: entity.email,
      document: entity.document,
      street: entity.address.street,
      number: entity.address.number,
      complement: entity.address.complement,
      city: entity.address.city,
      state: entity.address.state,
      zipcode: entity.address.zipCode,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    })
  }

  async find(id: string): Promise<Client> {
    const client = await ClientModel.findOne({ where: { id } })

    if (!client) {
      throw new Error('Client not found')
    }

    const result = client.toJSON()
    
    return new Client({
      id: new Id(result.id),
      name: result.name,
      email: result.email,
      document: result.document,
      address: new Address(
        result.street,
        result.number,
        result.complement,
        result.city,
        result.state,
        result.zipcode
      ),
      createdAt: result.createdAt,
      updatedAt: result.createdAt,
    })
  }
}
