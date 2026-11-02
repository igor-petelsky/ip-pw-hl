import { APIRequestContext, expect } from "@playwright/test";
import { Car } from "../builders/CarBuilder";
import { validateJSONSchema } from "../validators/validateJSONSchema";
import { carSchema } from "../schemas/car.schema";

export default class GarageService {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAllBrands() {
    const response = await this.request.get("/api/cars/brands");
    const responseJson = await response.json();
    expect(response.status()).toBe(200);

    return responseJson.data;
  }

  async getAllModels() {
    const response = await this.request.get("/api/cars/models");
    const responseJson = await response.json();
    expect(response.status()).toBe(200);

    return responseJson.data;
  }

  async getModel(id: number, isPositive: boolean = true) {
    const response = await this.request.get(`/api/cars/models/${id}`);
    if (isPositive) {
      const responseJson = await response.json();
      expect(response.status()).toBe(200);

      return responseJson.data;
    } else {
      return response;
    }
  }

  async removeCar(sid: string, id: string, isSuccess: boolean = true) {
    const response = await this.request.delete(`/api/cars/${id}`, {
      headers: {
        cookie: sid,
      },
    });

    const responseJson = await response.json();

    if (isSuccess) {
      expect(response.status()).toBe(200);
      expect(response.statusText()).toBe("OK");
      expect(responseJson.data.carId).toBe(id);
      console.log(`Car with ID: ${id} has been removed`);
    }
    return response;
  }

  async addCar(sid: string, car: Car, isSuccess = true) {
    const response = await this.request.post("/api/cars/", {
      data: car,
      headers: {
        cookie: sid,
      },
    });

    const responseJson = await response.json();
    const addedCar = responseJson.data;

    if (isSuccess) {
      expect(response.status()).toBe(201);

      validateJSONSchema(addedCar, carSchema);
      return addedCar;
    }

    return response;
  }

  async getUserCars(sid: string) {
    const response = await this.request.get("/api/cars", {
      headers: {
        cookie: sid,
      },
    });

    const responseJson = await response.json();
    expect(response.status()).toBe(201);

    const addedCar = responseJson.data;
    return addedCar;
  }
}
