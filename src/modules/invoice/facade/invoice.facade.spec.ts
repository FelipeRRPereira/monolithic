import { Sequelize } from 'sequelize-typescript'
import { InvoiceModel } from '../repository/invoice.model'
import { InvoiceItemModel } from '../repository/invoice_items.model'
import InvoiceFacadeFactory from '../factory/facade.factory'

describe('InvoiceFacade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find an invoice by id', async () => {
    const invoiceFactory = InvoiceFacadeFactory.create()

    await InvoiceModel.create({
      id: '1',
      name: 'Invoice 1',
      document: '123456789',
      street: 'Street 1',
      number: '123',
      complement: 'Apt 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345-678',
      total: 100,
      createdAt: new Date(),
    })

    await InvoiceItemModel.bulkCreate([{
      id: '1',
      name: 'Item 1',
      quantity: 1,
      price: 100,
      total: 100,
      invoiceId: '1',
      createdAt: new Date(),
    }])

    const result = await invoiceFactory.find({ id: '1' })

    expect(result).toBeDefined()
    expect(result.id).toEqual('1')
    expect(result.name).toEqual('Invoice 1')
    expect(result.document).toEqual('123456789')
    expect(result.address.street).toEqual('Street 1')
    expect(result.address.number).toEqual('123')
    expect(result.address.complement).toEqual('Apt 1')
    expect(result.address.city).toEqual('City 1')
    expect(result.address.state).toEqual('State 1')
    expect(result.address.zipCode).toEqual('12345-678')
    expect(result.items).toEqual([{
      id: '1',
      name: 'Item 1',
      quantity: 1,
      price: 100,
    }])
    expect(result.total).toEqual(100)
    expect(result.createdAt).toBeDefined()
  })

  it('should generate an invoice', async () => {
    const invoiceFactory = InvoiceFacadeFactory.create()

    const result = await invoiceFactory.generate({
      name: 'Invoice 1',
      document: '123456789',
      street: 'Street 1',
      number: '123',
      complement: 'Apt 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345-678',
      items: [{
        name: 'Item 1',
        quantity: 1,
        price: 100,
      }],
    })

    expect(result).toBeDefined()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual('Invoice 1')
    expect(result.document).toEqual('123456789')
    expect(result.address.street).toEqual('Street 1')
    expect(result.address.number).toEqual('123')
    expect(result.address.complement).toEqual('Apt 1')
    expect(result.address.city).toEqual('City 1')
    expect(result.address.state).toEqual('State 1')
    expect(result.address.zipCode).toEqual('12345-678')
    expect(result.items).toEqual([{
      id: expect.any(String),
      name: 'Item 1',
      quantity: 1,
      price: 100,
    }])
    expect(result.total).toEqual(100)
    expect(result.createdAt).toBeDefined()
  })
})