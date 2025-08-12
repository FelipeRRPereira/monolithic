import { Sequelize } from 'sequelize-typescript'
import TransactionModel from './transaction.model'
import Transaction, { TransactionId } from '../domain/transaction.entity'
import TransactionRepository from './transaction.repository'

describe('TransactionRepository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should save a transaction', async () => {
    const transaction = new Transaction({
      id: new TransactionId('1'),
      amount: 100,
      orderId: '1',
    })

    const transactionRepository = new TransactionRepository()
    const savedTransaction = await transactionRepository.save(transaction)

    expect(savedTransaction).toBeTruthy()
    expect(savedTransaction.id.id).toBe(transaction.id.id)
    expect(savedTransaction.amount).toBe(transaction.amount)
    expect(savedTransaction.orderId).toBe(transaction.orderId)
  })
})