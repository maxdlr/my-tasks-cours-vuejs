import { faker } from "@faker-js/faker";

const randomElement = (object) => {
  const randKey = Math.floor(Math.random() * Object.keys(object).length);
  return Object.values(object)[randKey];
};

export const status = {
  published: "published",
  draft: "draft",
  deleted: "deleted",
};

const makeObject = () => {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    title: faker.lorem.word(),
    author: {
      id: faker.number.int({ min: 1, max: 1000 }),
      name: faker.lorem.word(),
    },
    status: randomElement(status),
    description: faker.lorem.paragraph(30),
    createdAt: faker.date.past(),
  };
};

const makeData = (number) => {
  const objects = [];
  for (let i = 0; i < number; i++) {
    objects.push(makeObject());
  }
  objects.sort((a, b) => (a.id < b.id ? -1 : 1));

  return objects;
};

export default makeData;
