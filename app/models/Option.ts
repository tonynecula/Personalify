import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const OptionModel = types
  .model("Option")
  .props({
    id: types.identifier,
    label: types.string,
    score: types.number,
  })
  .actions(withSetPropAction)
  .views(() => ({}))
  .actions(() => ({}))
export interface Option extends Instance<typeof OptionModel> {}
export interface OptionSnapshotOut extends SnapshotOut<typeof OptionModel> {}
export interface OptionSnapshotIn extends SnapshotIn<typeof OptionModel> {}
export const createOptionDefaultModel = () => types.optional(OptionModel, {})
