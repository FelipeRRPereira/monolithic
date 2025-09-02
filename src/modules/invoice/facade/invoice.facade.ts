import FindInvoiceUseCase from '../usecase/find-invoice/find-invoice.usecase'
import GenerateInvoiceUseCase from '../usecase/generate-invoice/generate-invoice.usecase'
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from './invoice.facade.interface'

export interface UseCaseProps {
  findUseCase: FindInvoiceUseCase
  generateUseCase: GenerateInvoiceUseCase
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: FindInvoiceUseCase
  private _generateUseCase: GenerateInvoiceUseCase

  constructor(props: UseCaseProps) {
    this._findUseCase = props.findUseCase
    this._generateUseCase = props.generateUseCase
  }

  async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return this._findUseCase.execute(input)
  }

  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    const result = await this._generateUseCase.execute(input)
    return {
      id: result.id,
      name: result.name,
      document: result.document,
      address: {
        street: result.street,
        number: result.number,
        complement: result.complement,
        city: result.city,
        state: result.state,
        zipCode: result.zipCode,
      },
      items: result.items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: result.total,
      createdAt: result.createdAt,
    }
  }
}