import Id from '../../../@shared/domain/value-object/id.value-object'
import InvoiceItems from '../../domain/invoice_items.entity'
import GenerateInvoiceUseCase from './generate-invoice.usecase'
import { GenerateInvoiceUseCaseInputDto } from './generate-invoice.usecase.dto'

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn()
  }
}

describe('GenerateInvoiceUseCase', () => {
  let useCase: GenerateInvoiceUseCase
  let repository: any

  beforeEach(() => {
    repository = MockRepository()
    useCase = new GenerateInvoiceUseCase(repository)
  })

  it('should generate an invoice', async () => {
    const input: GenerateInvoiceUseCaseInputDto = {
      name: 'John Doe',
      document: '123456789',
      street: 'Main St',
      number: '123',
      complement: 'Apt 1',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      items: [
        { id: '1', name: 'Item 1', price: 100, quantity: 1 },
        { id: '2', name: 'Item 2', price: 200, quantity: 2 },
      ],
    }

    const result = await useCase.execute(input)

    expect(repository.generate).toHaveBeenCalled()
    expect(result).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      document: '123456789',
      street: 'Main St',
      number: '123',
      complement: 'Apt 1',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      items: [
        { id: expect.any(String), name: 'Item 1', price: 100, quantity: 1 },
        { id: expect.any(String), name: 'Item 2', price: 200, quantity: 2 },
      ],
      total: 500,
      createdAt: expect.any(Date),
    })
  })
})
