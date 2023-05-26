import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { QuestionModel } from "./Question"
import { ResultModel } from "./Result"

/**
 * Model description here for TypeScript hints.
 */
export const QuizModel = types
  .model("Quiz")
  .props({
    id: types.identifier,
    questions: types.array(QuestionModel),
    result: types.maybeNull(types.reference(ResultModel)),
  })
  .actions(withSetPropAction)
  .views(() => ({}))
  .actions(() => ({}))
export interface Quiz extends Instance<typeof QuizModel> {}
export interface QuizSnapshotOut extends SnapshotOut<typeof QuizModel> {}
export interface QuizSnapshotIn extends SnapshotIn<typeof QuizModel> {}
export const createQuizDefaultModel = () => types.optional(QuizModel, {})
