import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { OptionModel } from "./Option"

export const QuestionModel = types
  .model("Question")
  .props({
    id: types.identifier,
    questionText: types.string,
    options: types.array(OptionModel),
  })
  .actions(withSetPropAction)
  .views(() => ({}))
  .actions(() => ({}))
export interface Question extends Instance<typeof QuestionModel> {}
export interface QuestionSnapshotOut extends SnapshotOut<typeof QuestionModel> {}
export interface QuestionSnapshotIn extends SnapshotIn<typeof QuestionModel> {}
export const createQuestionDefaultModel = () => types.optional(QuestionModel, {})
