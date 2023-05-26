import { ResultModel } from "./Result"

test("can be created", () => {
  const instance = ResultModel.create({})

  expect(instance).toBeTruthy()
})
