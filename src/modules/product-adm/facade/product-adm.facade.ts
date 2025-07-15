import { UseCaseInterface } from '../../@shared/usecase/use-case.interface'
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from './product-adm.facade.interface'

export interface UseCasesProps {
  addUsecase: UseCaseInterface
  checkStockUsecase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UseCaseInterface
  private _checkStockUsecase: UseCaseInterface

  constructor(useCases: UseCasesProps) {
    this._addUsecase = useCases.addUsecase
    this._checkStockUsecase = useCases.checkStockUsecase
  }

  async addProduct(input: AddProductFacadeInputDto): Promise<void> {
    // Caso o DTO do UseCase for diferente da Facade, você deve fazer a conversão
    return this._addUsecase.execute(input)
  }

  async checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input)
  }
}
