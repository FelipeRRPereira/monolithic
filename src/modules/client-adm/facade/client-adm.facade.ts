import AddClientUseCase from '../usecase/add-client/add-client.usecase'
import FindClientUseCase from '../usecase/find-client/find-client.usecase'
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from './client-adm.facade.interface'

export interface UseCaseProps {
  findUsecase: FindClientUseCase
  addUsecase: AddClientUseCase
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUsecase: FindClientUseCase
  private _addUsecase: AddClientUseCase

  constructor(props: UseCaseProps) {
    this._findUsecase = props.findUsecase
    this._addUsecase = props.addUsecase
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUsecase.execute(input)
  }

  async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return await this._findUsecase.execute(input)
  }

  
}