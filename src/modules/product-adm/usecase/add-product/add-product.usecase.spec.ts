import AddProductUseCase from './add-product.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add Product UseCase Unit Test', () => {
  it('should add a product', async () => {
    const productRepository = MockRepository()
    const usecase = new AddProductUseCase(productRepository)
    
    const product = {
      name: 'Product 1',
      description: 'Description 1',
      purchasePrice: 100,
      stock: 10
    }

    const result = await usecase.execute(product)

    expect(productRepository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(product.name)
    expect(result.description).toBe(product.description)
    expect(result.purchasePrice).toBe(product.purchasePrice)
    expect(result.stock).toBe(product.stock)
  })
})