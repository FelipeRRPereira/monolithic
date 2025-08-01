import { Sequelize } from 'sequelize-typescript'
import ProductModel from './product.model'
import ProductRepository from './product.repository'

describe('ProductRepository test', () => {
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

  it('should find all products', async () => {
    const product1 = await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    })

    const product2 = await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      salesPrice: 200,
    })

    const productRepository = new ProductRepository()
    const products = await productRepository.findAll()

    expect(products.length).toBe(2)
    expect(products[0].id.id).toBe('1')
    expect(products[0].name).toBe('Product 1')
    expect(products[0].description).toBe('Description 1')
    expect(products[0].salesPrice).toBe(100)
    expect(products[1].id.id).toBe('2')
    expect(products[1].name).toBe('Product 2')
    expect(products[1].description).toBe('Description 2')
    expect(products[1].salesPrice).toBe(200)
  })

  it('should find a product by id', async () => {
    const product = await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    })

    const productRepository = new ProductRepository()
    const foundProduct = await productRepository.find('1')

    expect(foundProduct.id.id).toBe('1')
    expect(foundProduct.name).toBe('Product 1')
    expect(foundProduct.description).toBe('Description 1')
    expect(foundProduct.salesPrice).toBe(100)
  })
})
