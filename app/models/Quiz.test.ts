import { QuizModel } from "./Quiz"

test("can be created", () => {
  const instance = QuizModel.create({})

  expect(instance).toBeTruthy()
})
