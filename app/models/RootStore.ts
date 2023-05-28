import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { QuizStoreModel } from "./QuizStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  quizStore: types.optional(QuizStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
