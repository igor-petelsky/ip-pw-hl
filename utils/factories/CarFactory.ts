import { CarBuilder } from "../api/builders/CarBuilder";

export class CarFactory {
  static fordFiesta(): CarBuilder {
    return new CarBuilder()
      .setBrand(3)
      .setModel(11)
      .setMileage(123);
  }
}