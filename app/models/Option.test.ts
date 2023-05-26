import { OptionModel } from "./Option"

test("can be created", () => {
  const instance = OptionModel.create({})

  expect(instance).toBeTruthy()
})
