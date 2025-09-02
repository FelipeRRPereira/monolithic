import Invoice from '../domain/invoice.entity'

export default interface InvoiceGatewayInterface {
  find(id: string): Promise<Invoice>
  generate(invoice: Invoice): Promise<void>
}