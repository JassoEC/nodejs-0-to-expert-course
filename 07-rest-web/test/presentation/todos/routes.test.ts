import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";

describe("testing todos routes", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  afterEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo = { text: "todo 1" };
  const todo2 = { text: "todo 2" };

  const app = request(testServer.app);

  test("should return todos routes", async () => {
    await prisma.todo.createMany({ data: [todo, todo2] });

    const { body } = await app.get("/api/todos").expect(200);

    const [first, second] = body;

    expect(body).toBeInstanceOf(Array);
    expect(body).toHaveLength(2);
    expect(first.text).toBe(todo.text);
    expect(first.completedAt).toBeNull();
  });

  test("should get a todo by id", async () => {
    const { id } = await prisma.todo.create({ data: todo });

    const { body } = await app.get(`/api/todos/${id}`).expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: expect.any(String),
      completedAt: null,
    });
  });

  test("should NOT get a todo by id", async () => {
    const id = 1244; // id not found

    const { body } = await app.get(`/api/todos/${id}`).expect(400);

    expect(body).toEqual({
      error: expect.any(String),
    });
  });

  test("should create a todo", async () => {
    const { body } = await app.post("/api/todos").send(todo).expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo.text,
      completedAt: null,
    });
  });

  test("should return an Error when creates a todo without a text", async () => {
    const { body } = await app
      .post("/api/todos")
      .send({ text: null })
      .expect(400);

    expect(body).toEqual({
      error: expect.any(String),
    });
  });

  test("should return an Error when creates a todo an empty text", async () => {
    const { body } = await app
      .post("/api/todos")
      .send({ text: "" })
      .expect(400);

    expect(body).toEqual({
      error: expect.any(String),
    });
  });

  test("should update a todo", async () => {
    const completedAt = new Date().toISOString();
    const { id } = await prisma.todo.create({ data: { ...todo, completedAt } });

    const { body } = await app
      .put(`/api/todos/${id}`)
      .send({ text: "todo updated" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: "todo updated",
      completedAt: completedAt,
    });
  });

  test("should delete a todo", async () => {
    const { id } = await prisma.todo.create({ data: todo });

    await app.delete(`/api/todos/${id}`).expect(200);

    const todoDeleted = await prisma.todo.findUnique({ where: { id } });

    expect(todoDeleted).toBeNull();
  });

  test("should NOT delete a todo", async () => {
    const id = 1244; // id not found

    const { body } = await app.delete(`/api/todos/${id}`).expect(500);

    expect(body).toEqual({
      error: expect.any(String),
    });
  });
});
