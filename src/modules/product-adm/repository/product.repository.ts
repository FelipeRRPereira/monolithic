import Id from '../../@shared/domain/value-object/id.value-object'
import Product from '../domain/product.entity'
import ProductGateway from '../gateway/product.gateway'
import { ProductModel } from './product.model'

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
    })
  }

  async find(id: string): Promise<Product | null> {
    const product = await ProductModel.findOne({ where: { id } })
    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }
    const plain = product.toJSON()

    return new Product({
      id: new Id(plain.id),
      name: plain.name,
      description: plain.description,
      purchasePrice: plain.purchasePrice,
      stock: plain.stock,
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
    })
  }
}