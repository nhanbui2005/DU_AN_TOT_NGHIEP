import axiosInstance from "@/src/config/axios";
import { CategoryRespondDto } from "../../dto/category-dto/category-respond.dto";

export class CategoryService {
    private static readonly BASE_URL = '/category';


    static async getCategoriesByType(type: string): Promise<CategoryRespondDto[]> {
        try {
            const response = await axiosInstance.get(`${this.BASE_URL}/get-categories`, {
                params:{type: type}
            });
            return response.data.data as CategoryRespondDto[];
            
        } catch (error) {
            throw new Error(`Failed to fetch categories: ${error}`);
        }
    }
}

