import { UseCaseInterface } from '../../../@shared/usecase/use-case.interface'
import InvoiceGatewayInterface from '../../gateway/invoice.gateway'
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from './find-invoice.usecase.dto'

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private invoiceRepository: InvoiceGatewayInterface) {}

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id)
    if (!invoice) {
      throw new Error(`Invoice with id ${input.id} not found`)
    }
    
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: invoice.total(),
      createdAt: invoice.createdAt,
    }
  }

}