import { faker } from "@faker-js/faker";
import { User } from "../types";
export const Users: User[] = [];

export const createRandomUser = (): User => {
  return {
    userId: faker.datatype.uuid(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthDate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
};
