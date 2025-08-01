import Id from '../../@shared/domain/value-object/id.value-object'
import Product from '../domain/product.entity'
import ProductGateway from '../gateway/product.gateway'
import ProductModel from './product.model'

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()

    const plain = products.map(product => product.toJSON())
    return plain.map(product => 
      new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })
    )
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } })
    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }

    const plainProduct = product.toJSON()
    return new Product({
      id: new Id(plainProduct.id),
      name: plainProduct.name,
      description: plainProduct.description,
      salesPrice: plainProduct.salesPrice,
    })
  }
}