import { UseCaseInterface } from '../../@shared/usecase/use-case.interface'
import PaymentFacadeInterface, { PaymantFacadeInputDto, PaymentFacadeOutputDto } from './payment.facade.interface'

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: UseCaseInterface) {}

  async process(input: PaymantFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input)
  }
}