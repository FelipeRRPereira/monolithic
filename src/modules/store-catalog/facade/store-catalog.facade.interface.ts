export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto {
  products: FindStoreCatalogFacadeOutputDto[];
}

export default interface StoreCatalogFacadeInterface {
  find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}