import Product from '../../domain/product.entity'
import { CheckStockInputDto, CheckStockOutputDto } from './check-stock.dto'
import CheckStockUsecase from './check-stock.usecase'

const product = new Product ({
  name: 'Product 1',
  description: 'Description of Product 1',
  purchasePrice: 100,
  stock: 10,
})

const MotckRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
  }
}

describe('CheckStock usecase unit tests', () => {
  it('should get stock of a product', async () => {
    const productRepository = MotckRepository()
    const checkStockUsecase = new CheckStockUsecase(productRepository)

    const input: CheckStockInputDto = {
      productId: '123',
    }

    const output: CheckStockOutputDto = await checkStockUsecase.execute(input)

    expect(productRepository.find).toHaveBeenCalledWith(input.productId)
    expect(output.productId).toBe(input.productId)
    expect(output.stock).toBe(product.stock)
  })
})