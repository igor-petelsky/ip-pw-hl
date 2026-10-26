import test, { expect } from "@playwright/test";
import { testUser1 } from "../../../test-data/validUsers";

let sid: string;

test.describe("Cars", () => {
  test.beforeAll(async ({ request }) => {
    const response = await request.post("api/auth/signin", {
      data: {
        email: testUser1.email,
        password: testUser1.password,
      },
    });

    expect(response.status()).toBe(200);
    sid = response.headers()["set-cookie"].split(";")[0];
    expect(sid).toContain("sid=");

    console.log(await response.json());
  });

  test("GET car brands", async ({ request }) => {
    const response = await request.get("api/cars/brands", {});

    console.log(await response.json());

    const responseJson = await response.json();
    const brands = responseJson.data;

    expect(response.status()).toBe(200);
    expect(brands).toHaveLength(5);
  });

  test("GET car by ID", async ({ request }) => {
    const response = await request.get("api/cars/brands/1", {});

    console.log(await response.json());

    const responseJson = await response.json();
    const carData = responseJson.data;

    expect(response.status()).toBe(200);
    expect(Object.keys(carData).length).toBe(3); //check object length
    expect(carData.id).toBe(1);
    expect(carData.title).toBe("Audi");
    expect(carData.logoFilename).toBe("audi.png");
  });

  test("GET car models", async ({ request }) => {
    const response = await request.get("api/cars/models", {});

    const responseJson = await response.json();
    console.log(responseJson);
    const models = responseJson.data;

    expect(response.status()).toBe(200);
    expect(models).toHaveLength(23);
  });

  test("GET model by ID", async ({ request }) => {
    const response = await request.get("api/cars/models/1", {});

    const responseJson = await response.json();
    console.log(responseJson);
    const carModels = responseJson.data;

    expect(response.status()).toBe(200);
    expect(Object.keys(carModels).length).toBe(3); //check object length
    expect(carModels.id).toBe(1);
    expect(carModels.carBrandId).toBe(1);
    expect(carModels.title).toBe("TT");
  });

  test("GET user's cars", async ({ request }) => {
    const response = await request.get("api/cars", {
      headers: { cookie: sid },
    });

    const responseJson = await response.json();
    console.log(responseJson);
    const carData = responseJson.data;

    expect(response.status()).toBe(200);
  });

  test("GET user's car by ID", async ({ request }) => {
    const carId = 571321;

    const response = await request.get("api/cars/" + carId, {
      headers: { cookie: sid },
    });

    const responseJson = await response.json();
    console.log(responseJson);
    const carData = responseJson.data;

    expect(response.status()).toBe(200);
    expect(Object.keys(carData).length).toBe(10); //check object length
    expect(carData.id).toBe(carId);
    expect(carData.carBrandId).toBe(2);
    expect(carData.carModelId).toBe(8);
  });

  test.describe("Private requests", () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
      const responseAuth = await request.post("api/auth/signin", {
        data: {
          email: testUser1.email,
          password: testUser1.password,
        },
      });

      sid = responseAuth.headers()["set-cookie"].split(";")[0];

      expect(responseAuth.status()).toBe(200);
      expect(sid).toContain("sid=");
    });

    test.describe("Removing cars", () => {
      let carToRemoveId: string;

      test.beforeAll(async ({ request }) => {
        const newCar = {
          carBrandId: 1,
          carModelId: 1,
          mileage: 123,
        };

        const response = await request.post("/api/cars/", {
          data: newCar,
          headers: {
            cookie: sid,
          },
        });

        const responseJson = await response.json();
        const addedCar = responseJson.data;
        carToRemoveId = addedCar.id;

        expect(response.status()).toBe(201);
      });

      test("Remove a car", async ({ request }) => {
        const response = await request.delete(`/api/cars/${carToRemoveId}`, {
          headers: {
            cookie: sid,
          },
        });

        expect(response.status()).toBe(200);
      });

      test("Remove a car with invalid id", async ({ request }) => {
        const response = await request.delete(`/api/cars/529532535353`, {
          headers: {
            cookie: sid,
          },
        });
        const responseJson = await response.json();

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe("Car not found");
      });
    });

    test.describe("Adding new cars", () => {
      let addedCarsToRemove: number[] = [];

      test("Add new car - Ford Fiesta", async ({ request }) => {
        const newCar = {
          carBrandId: 3,
          carModelId: 11,
          mileage: 123,
        };

        const response = await request.post("/api/cars/", {
          data: newCar,
          headers: {
            cookie: sid,
          },
        });

        const responseJson = await response.json();
        const addedCar = responseJson.data;

        expect(response.status()).toBe(201);
        expect(addedCar.carBrandId).toBe(newCar.carBrandId);
        expect(addedCar.carModelId).toBe(newCar.carModelId);
        expect(addedCar.initialMileage).toBe(newCar.mileage);
        expect(addedCar.id).toBeDefined();

        addedCarsToRemove.push(addedCar.id);
      });

      test("Add new car - Audi TT", async ({ request }) => {
        const newCar = {
          carBrandId: 1,
          carModelId: 1,
          mileage: 123,
        };

        const response = await request.post("/api/cars/", {
          data: newCar,
          headers: {
            cookie: sid,
          },
        });

        const responseJson = await response.json();
        const addedCar = responseJson.data;

        expect(response.status()).toBe(201);
        expect(addedCar.carBrandId).toBe(newCar.carBrandId);
        expect(addedCar.carModelId).toBe(newCar.carModelId);
        expect(addedCar.initialMileage).toBe(newCar.mileage);
        expect(addedCar.id).toBeDefined();

        addedCarsToRemove.push(addedCar.id);
      });

      test.afterAll(async ({ request }) => {
        for (const id of addedCarsToRemove) {
          const response = await request.delete(`/api/cars/${id}`, {
            headers: {
              cookie: sid,
            },
          });

          expect(response.status()).toBe(200);
        }
      });
    });
  });
});
