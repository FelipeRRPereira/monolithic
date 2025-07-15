import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DataType,
} from 'sequelize-typescript'

@Table({
  tableName: 'products',
  timestamps: false,
})
export class ProductModel extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  id: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  description: string

  @Column({ allowNull: false })
  purchasePrice: number

  @Column({ allowNull: false })
  stock: number

  @Column({
    allowNull: false,
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date

  @Column({
    allowNull: false,
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date
}
