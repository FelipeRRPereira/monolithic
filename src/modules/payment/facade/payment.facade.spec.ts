import { Sequelize } from 'sequelize-typescript'
import TransactionModel from '../repository/transaction.model'
import PaymentFacadeFactory from '../factory/facade.factory'

describe('PaymentFacade', () => {
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

  it('should process a payment', async () => {
    const facade = PaymentFacadeFactory.create()

    const input = {
      orderId: '123',
      amount: 100,
    }
    
    const output = await facade.process(input)
    
    expect(output.transactionId).toBeDefined()
    expect(output.orderId).toEqual(input.orderId)
    expect(output.amount).toEqual(input.amount)
    expect(output.status).toEqual('approved')
    expect(output.createdAt).toBeInstanceOf(Date)
    expect(output.updatedAt).toBeInstanceOf(Date)
  })
})