import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { QuestionModel } from "./Question"
import { personalityType } from "./Quiz"

export const QuizStoreModel = types
  .model("QuizStore")
  .props({
    questions: types.array(QuestionModel),
    totalScore: types.maybe(types.number),
    personalityType: types.maybe(types.enumeration(Object.values(personalityType))),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async getQuestions() {
      console.log("arrived store")
      const response = await api.getQuestions()
      if (response.kind === "ok") {
        // The response returns a quiz object that includes a data array.
        // Assuming there's only one quiz and we only care about the questions, we extract them here:\
        console.log(response)
        if (response.quiz && response.quiz.questions) {
          const questions = response.quiz.questions.map((q) => QuestionModel.create(q))
          store.setProp("questions", questions) // Now we actually store the questions in the store.
        }
      } else {
        console.tron.error(`Error fetching questions: ${JSON.stringify(response)}`, [])
      }
    },

    async updateQuiz(quiz: any) {
      const response = await api.updateQuiz(quiz)
      if (response.kind === "ok") {
        // Do something with the response data
      } else {
        // Handle other response types as necessary
      }
    },
  }))

export interface QuizStore extends Instance<typeof QuizStoreModel> {}
export interface QuizStoreSnapshot extends SnapshotOut<typeof QuizStoreModel> {}
