import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../@shared/domain/entity/base.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

type InvoiceItemsProps = {
  id?: Id
  name: string
  price: number
  quantity: number
}

export default class InvoiceItems extends BaseEntity implements AggregateRoot {
  private _name: string
  private _price: number
  private _quantity: number
  private _total: number

  constructor(props: InvoiceItemsProps) {
    super(props.id)
    this._name = props.name
    this._price = props.price
    this._quantity = props.quantity
    this._total = this.total()
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }

  get quantity(): number {
    return this._quantity
  }
  
  total(): number {
    return this._price * this._quantity
  }
}