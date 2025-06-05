import axiosInstance from "@/src/config/axios";
import { SearchParams } from "../../dto/search-dto/search-param.dto";
import { SearchRespondDto } from "../../dto/search-dto/search-respond.dto";

export class SearchService{
    private static readonly BASE_URL ="/products"



    static async search(query:SearchParams):Promise<SearchRespondDto>{
        try {
            const respond = await axiosInstance.get(`${this.BASE_URL}/getProducts`,{params:query})

            if(!respond?.data?.success){
                throw new Error(respond?.data?.message || "Failed to fetch products");
            }
            return respond.data.data as SearchRespondDto;
            
            
        } catch (error) {
            throw error;
        }
    }
}
