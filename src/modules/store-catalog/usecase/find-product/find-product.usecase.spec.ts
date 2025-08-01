import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/product.entity'
import { FindProductInputDto } from './find-product.dto'
import FindProductUsecase from './find-product.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100,
})

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  }
}

describe('FindProductUsecase Unit Tests', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const usecase = new FindProductUsecase(productRepository)

    const input: FindProductInputDto = {
      id: '1',
    }

    const output = await usecase.execute(input)

    expect(productRepository.find).toHaveBeenCalledWith(input.id)
    expect(output).toEqual({
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    })
  })

  it('should throw an error when product is not found', async () => {
    const productRepository = MockRepository()
    productRepository.find.mockReturnValue(Promise.resolve(null))
    const usecase = new FindProductUsecase(productRepository)

    const input: FindProductInputDto = {
      id: '999',
    }

    await expect(usecase.execute(input)).rejects.toThrow('Product with id 999 not found')
  })
})