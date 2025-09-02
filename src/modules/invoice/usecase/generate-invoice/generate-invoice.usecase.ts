import Id from '../../../@shared/domain/value-object/id.value-object'
import Invoice from '../../domain/invoice.entity'
import InvoiceItems from '../../domain/invoice_items.entity'
import InvoiceGatewayInterface from '../../gateway/invoice.gateway'
import Address from '../../value-object/address'
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from './generate-invoice.usecase.dto'

export default class GenerateInvoiceUseCase {
  private _repository: InvoiceGatewayInterface

  constructor(repository: InvoiceGatewayInterface) {
    this._repository = repository
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      id: input.id ? new Id(input.id) : undefined,
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.number,
        input.complement,
        input.city,
        input.state,
        input.zipCode
      ),
      items: input.items.map(
        (item) =>
          new InvoiceItems({
            id: input.id ? new Id(input.id) : undefined,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })
      ),
    }
    const invoice = new Invoice(props)

    await this._repository.generate(invoice)
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: invoice.total(),
      createdAt: invoice.createdAt,
    }
  }
}