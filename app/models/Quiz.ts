import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { QuestionModel } from "./Question"
/**
 * Model description here for TypeScript hints.
 */
export enum personalityType {
  INTROVERT = 'INTROVERT',
  EXTROVERT = 'EXTROVERT',
}

export const QuizModel = types
.model("Quiz")
.props({
  questions: types.array(QuestionModel),
  totalScore: types.maybe(types.number),
  personalityType: types.maybe(types.enumeration(Object.values(personalityType))),
})
.actions(withSetPropAction)
.views(() => ({}))
.actions(() => ({}))
export interface Quiz extends Instance<typeof QuizModel> {}
export interface QuizSnapshotOut extends SnapshotOut<typeof QuizModel> {}
export interface QuizSnapshotIn extends SnapshotIn<typeof QuizModel> {}
export const createQuizDefaultModel = () => types.optional(QuizModel, {})