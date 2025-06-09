import axiosInstance from "@/src/config/axios";

export class AddressService {
  private static readonly BASE_URL = "/address";

  static async getProvinces() {
    const respond = await axiosInstance.get(`${this.BASE_URL}/all-province`);
    if (!respond.data?.success) {
      throw new Error(respond.data?.message || "Failed to fetch provinces");
    }
    return respond.data.data; 
  }

  static async getDistricts(provinceCode: string) {
    const respond = await axiosInstance.get(`${this.BASE_URL}/districts`, {
      params: { "provice-code": provinceCode },
    });
    if (!respond.data?.success) {
      throw new Error(respond.data?.message || "Failed to fetch districts");
    }
    return respond.data.data; 
  }

  static async getWards(districtCode: string) {
    const respond = await axiosInstance.get(`${this.BASE_URL}/wards`, {
      params: { "districts-code": districtCode },
    });
    if (!respond.data?.success) {
      throw new Error(respond.data?.message || "Failed to fetch wards");
    }
    return respond.data.data; 
  }
}
