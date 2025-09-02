import Id from '../../@shared/domain/value-object/id.value-object'
import Invoice from '../domain/invoice.entity'
import InvoiceItems from '../domain/invoice_items.entity'
import InvoiceGatewayInterface from '../gateway/invoice.gateway'
import Address from '../value-object/address'
import { InvoiceModel } from './invoice.model'
import { InvoiceItemModel } from './invoice_items.model'

export default class InvoiceRepository implements InvoiceGatewayInterface {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: { id },
      include: [{ model: InvoiceItemModel, as: 'items' }],
    })
    if (!invoice) throw new Error('Invoice not found')
    
    const result = invoice.toJSON()

    return new Invoice({
      id: new Id(result.id),
      name: result.name,
      document: result.document,
      address: new Address(
        result.street,
        result.number,
        result.complement,
        result.city,
        result.state,
        result.zipCode,
      ),
      items: result.items.map((item: any) => (
        new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })
      )),
    })
  }

  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      total: invoice.total(),
      createdAt: new Date(),
    })

    await InvoiceItemModel.bulkCreate(
      invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total(),
        invoiceId: invoice.id.id,
        createdAt: new Date(),
      }))
    )
  }

}