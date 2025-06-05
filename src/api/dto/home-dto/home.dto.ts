export interface SearchRespondDto {

    data: ProductHomeDto[]
    total: number
    page: string
    limit: string
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean


}

export interface ProductHomeDto {
    _id: string;
    name: string;
    images: string[];
    maxPromotionalPrice: number ;
    maxSellingPrice: number;
    minPromotionalPrice: number ;
    minSellingPrice: number;
}

export interface SearchParams {
    search?:string,
    limit?:number,
    page?:number,
    sortBy?:"minPromotionalPrice"|"maxPromotionalPrice"|"createdDate"
    order?:"asc"|"desc"
}