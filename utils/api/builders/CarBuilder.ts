export interface Car {
  carBrandId: number;
  carModelId: number;
  mileage: number;
}

export class CarBuilder {
  private carBrandId = 0;
  private carModelId = 0;
  private mileage = 0;

  setBrand(id: number): this {
    this.carBrandId = id;
    return this;
  }

  setModel(id: number): this {
    this.carModelId = id;
    return this;
  }

  setMileage(mileage: number): this {
    this.mileage = mileage;
    return this;
  }

  build(): Car {
    return {
      carBrandId: this.carBrandId,
      carModelId: this.carModelId,
      mileage: this.mileage
    };
  }
}