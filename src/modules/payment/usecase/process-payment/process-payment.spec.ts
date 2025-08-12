import Transaction, { TransactionId } from '../../domain/transaction.entity'
import ProcessPaymentUseCase from './process-payment'

const transaction = new Transaction({
  id: new TransactionId('1'),
  amount: 99,
  orderId: '1',
})

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  }
}

describe('Process Payment UseCase Unit Test', () => {
  it('should process a payment', async () => {
    const paymentRepository = MockRepository()
    const usecase = new ProcessPaymentUseCase(paymentRepository)

    const input = {
      orderId: '1',
      amount: 100,
    }

    const result = await usecase.execute(input)

    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transaction.id.id)
    expect(result.status).toBe('approved')
    expect(result.amount).toBe(input.amount)
    expect(result.orderId).toBe(input.orderId)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()

  })

  it('should decline a payment if amount is less than 100', async () => {
    const paymentRepository = MockRepository()
    const usecase = new ProcessPaymentUseCase(paymentRepository)

    const input = {
      orderId: '1',
      amount: 50,
    }

    const result = await usecase.execute(input)

    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe(transaction.id.id)
    expect(result.status).toBe('declined')
    expect(result.amount).toBe(input.amount)
    expect(result.orderId).toBe(input.orderId)
    expect(result.createdAt).toBeDefined()
    expect(result.updatedAt).toBeDefined()
  })
})