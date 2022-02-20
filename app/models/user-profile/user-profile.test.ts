import { UserProfileModel } from "./user-profile"

test("can be created", () => {
  const instance = UserProfileModel.create({})

  expect(instance).toBeTruthy()
})
