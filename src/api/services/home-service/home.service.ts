import axiosInstance from "@/src/config/axios";
import { SearchParams, SearchRespondDto } from "../../dto/home-dto/home.dto";

export class HomeService {
    private static readonly BASE_URL = "/products"


    static async search(query: SearchParams): Promise<SearchRespondDto> {
        try {
            const respond = await axiosInstance.get(`${this.BASE_URL}/getProducts`, { params: query })

            if (!respond?.data?.success) {
                throw new Error(respond?.data?.message || "Failed to fetch products");
            }
            return respond.data.data as SearchRespondDto;


        } catch (error) {
            throw error;
        }
    }
}


