import Id from '../../../@shared/domain/value-object/id.value-object'
import Invoice from '../../domain/invoice.entity'
import InvoiceItems from '../../domain/invoice_items.entity'
import Address from '../../value-object/address'
import FindInvoiceUseCase from './find-invoice.usecase'

const invoice = new Invoice({
  id: new Id('1'),
  name: 'Invoice A',
  document: '123456789',
  address: new Address(
    'Main St',
    '123',
    'Apt 1',
    'Anytown',
    'CA',
    '12345',
  ),
  items: [
    new InvoiceItems({
      id: new Id('1'),
      name: 'Item 1',
      price: 100,
      quantity: 2,
    }),
    new InvoiceItems({
      id: new Id('2'),
      name: 'Item 2',
      price: 50,
      quantity: 1,
    }),
  ],
})

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn(),
  }
}

describe('FindInvoiceUseCase Unit Tests', () => {
  it('should find an invoice by id', async () => {
    const repository = MockRepository()
    const useCase = new FindInvoiceUseCase(repository)

    const input = { id: '1' }

    const result = await useCase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toEqual(invoice.id.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.address).toEqual({
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
    })
    expect(result.items).toEqual(invoice.items.map(item => ({
      id: item.id.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })))
    expect(result.total).toEqual(invoice.total())
    expect(result.createdAt).toEqual(invoice.createdAt)
  })
})