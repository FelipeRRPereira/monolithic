import { Sequelize } from 'sequelize-typescript'
import { InvoiceModel } from './invoice.model'
import { InvoiceItemModel } from './invoice_items.model'
import InvoiceRepository from './invoice.repository'
import Id from '../../@shared/domain/value-object/id.value-object'
import InvoiceItems from '../domain/invoice_items.entity'
import Address from '../value-object/address'
import Invoice from '../domain/invoice.entity'

describe('InvoiceRepository test', () => {
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

  it('should find a invoice', async () => {
    const invoice = await InvoiceModel.create({
      id: '123',
      name: 'Item A',
      document: 'Document A',
      street: 'Street A',
      number: '123',
      complement: 'Apt 1',
      city: 'City A',
      state: 'State A',
      zipCode: '12345',
      total: 200,
      createdAt: new Date(),
    })

    await InvoiceItemModel.bulkCreate([
      {
        id: '1',
        name: 'Item A1',
        quantity: 1,
        price: 100,
        total: 100,
        invoiceId: '123',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Item A2',
        quantity: 1,
        price: 100,
        total: 100,
        invoiceId: '123',
        createdAt: new Date(),
      },
    ])

    const result = invoice.toJSON()
    
    const repository = new InvoiceRepository()
    const foundInvoice = await repository.find(result.id)

    expect(foundInvoice.id.id).toEqual(result.id)
    expect(foundInvoice.name).toEqual(result.name)
    expect(foundInvoice.document).toEqual(result.document)
    expect(foundInvoice.address.street).toEqual(result.street)
    expect(foundInvoice.address.number).toEqual(result.number)
    expect(foundInvoice.address.complement).toEqual(result.complement)
    expect(foundInvoice.address.city).toEqual(result.city)
    expect(foundInvoice.address.state).toEqual(result.state)
    expect(foundInvoice.address.zipCode).toEqual(result.zipCode)
    expect(foundInvoice.items.length).toEqual(2)
    expect(foundInvoice.items[0].id.id).toEqual('1')
    expect(foundInvoice.items[0].name).toEqual('Item A1')
    expect(foundInvoice.items[0].quantity).toEqual(1)
    expect(foundInvoice.items[0].price).toEqual(100)
    expect(foundInvoice.items[1].id.id).toEqual('2')
    expect(foundInvoice.items[1].name).toEqual('Item A2')
    expect(foundInvoice.items[1].quantity).toEqual(1)
    expect(foundInvoice.items[1].price).toEqual(100)
    expect(foundInvoice.createdAt).toBeDefined()
  })

  it('should generate a invoice', async () => {
    const invoice = new Invoice({
      name: 'Item A',
      document: 'Document A',
      address: new Address(
        'Street A',
        '123',
        'Apt 1',
        'City A',
        'State A',
        '12345'
      ),
      items: [
        new InvoiceItems({
          id: new Id('1'),
          name: 'Item A1',
          price: 100,
          quantity: 1,
        }),
        new InvoiceItems({
          id: new Id('2'),
          name: 'Item A2',
          price: 100,
          quantity: 1,
        }),
      ],
    })

    const repository = new InvoiceRepository()
    await repository.generate(invoice)

    const result = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [{ model: InvoiceItemModel, as: 'items' }]
    })
    const invoiceDb = result.toJSON()

    expect(invoiceDb.id).toBeDefined()
    expect(invoiceDb.name).toEqual('Item A')
    expect(invoiceDb.document).toEqual('Document A')
    expect(invoiceDb.street).toEqual('Street A')
    expect(invoiceDb.number).toEqual('123')
    expect(invoiceDb.complement).toEqual('Apt 1')
    expect(invoiceDb.city).toEqual('City A')
    expect(invoiceDb.state).toEqual('State A')
    expect(invoiceDb.zipCode).toEqual('12345')
    expect(invoiceDb.items.length).toEqual(2)
    expect(invoiceDb.items[0].id).toBeDefined()
    expect(invoiceDb.items[0].name).toEqual('Item A1')
    expect(invoiceDb.items[0].quantity).toEqual(1)
    expect(invoiceDb.items[0].price).toEqual(100)
    expect(invoiceDb.items[1].id).toBeDefined()
    expect(invoiceDb.items[1].name).toEqual('Item A2')
    expect(invoiceDb.items[1].quantity).toEqual(1)
    expect(invoiceDb.items[1].price).toEqual(100)
    expect(invoiceDb.createdAt).toBeDefined()
  })
})
