import { UseCaseInterface } from '../../../@shared/usecase/use-case.interface'
import Transaction from '../../domain/transaction.entity'
import PaymentGateway from '../../gateway/payment.gateway'
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from './process-payment.dto'

export default class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(private paymentRepository: PaymentGateway) {}

  async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
      status: 'pending',
    })

    transaction.process()

    const savedTransaction = await this.paymentRepository.save(transaction)
    
    return {
      transactionId: savedTransaction.id.id,
      orderId: savedTransaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      createdAt: savedTransaction.createdAt,
      updatedAt: savedTransaction.updatedAt,
    }
  }
}