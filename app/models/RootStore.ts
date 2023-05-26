import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { QuizModel } from "./Quiz"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  quiz: types.optional(QuizModel, { id: "some-unique-id" }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
