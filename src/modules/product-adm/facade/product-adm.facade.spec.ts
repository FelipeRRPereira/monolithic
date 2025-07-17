import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../repository/product.model'
import ProductAdmFacadeFactory from '../factory/facade.factory'

describe('ProductAdmFacade', () => {
  let sequelize: Sequelize
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('Should create a product', async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create()

    const input = {
      id: '123',
      name: 'Product 1',
      description: 'Description of Product 1',
      purchasePrice: 100,
      stock: 10,
    }
    await productAdmFacade.addProduct(input)

    const result = await ProductModel.findOne({ where: { id: input.id } })
    const product = result.toJSON()
    expect(product).toBeDefined()
    expect(product.id).toBe(input.id)
    expect(product.name).toBe(input.name)
    expect(product.description).toBe(input.description)
    expect(product.purchasePrice).toBe(input.purchasePrice)
    expect(product.stock).toBe(input.stock)
    expect(product.createdAt).toBeDefined()
    expect(product.updatedAt).toBeDefined()
  })

  it('Should check product stock', async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create()

    const input = {
      id: '123',
      name: 'Product 1',
      description: 'Description of Product 1',
      purchasePrice: 100,
      stock: 10,
    }
    await productAdmFacade.addProduct(input)

    const result = await productAdmFacade.checkStock({
      productId: input.id
    })

    expect(result.productId).toBe(input.id)
    expect(result.stock).toBe(input.stock)
  })

})
