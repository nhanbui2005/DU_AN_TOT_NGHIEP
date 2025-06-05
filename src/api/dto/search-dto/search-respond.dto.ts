export interface SearchRespondDto {

    data: ProductSearchDto[]
    total: number
    page: string
    limit: string
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean


}

export interface ProductSearchDto {
    _id: string;
    name: string;
    images: string[];
    maxPromotionalPrice: number ;
    maxSellingPrice: number;
    minPromotionalPrice: number ;
    minSellingPrice: number;
}