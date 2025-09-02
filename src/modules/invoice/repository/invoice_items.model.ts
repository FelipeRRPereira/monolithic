import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  tableName: 'invoice_items',
  timestamps: false,
})
export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @Column({ allowNull: false })
  name: string

  
  @Column({ allowNull: false })
  quantity: number
  
  @Column({ allowNull: false })
  price: number
  
  @Column({ allowNull: false })
  total: number

  @ForeignKey(() => require('./invoice.model').InvoiceModel)
  @Column({ allowNull: false, field: 'invoice_id' })
  invoiceId: string

  @BelongsTo(() => require('./invoice.model').InvoiceModel)
  invoice: any

  @Column({ allowNull: false })
  createdAt: Date
}
