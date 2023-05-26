import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ResultModel = types
  .model("Result")
  .props({
    id: types.identifier,
    resultText: types.string,
  })
  .actions(withSetPropAction)
  .views(() => ({}))
  .actions(() => ({}))
export interface Result extends Instance<typeof ResultModel> {}
export interface ResultSnapshotOut extends SnapshotOut<typeof ResultModel> {}
export interface ResultSnapshotIn extends SnapshotIn<typeof ResultModel> {}
export const createResultDefaultModel = () => types.optional(ResultModel, {})
