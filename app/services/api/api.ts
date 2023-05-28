import { ApisauceInstance, create, ApiResponse } from "apisauce"
import Config from "../../config"
import { ApiConfig } from "./api.types"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import { Quiz } from "app/models"

export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  async getQuestions(): Promise<{ kind: "ok"; quiz: any } | GeneralApiProblem> {
    console.log("arrived api")
    const response: ApiResponse<any> = await this.apisauce.get("/quiz")
    console.log()
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data

      const quiz = rawData.data[0]

      return { kind: "ok", quiz }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }

  async updateQuiz(quiz: any): Promise<{ kind: "ok"; data: Quiz } | GeneralApiProblem> {
    const response: ApiResponse<any> = await this.apisauce.put("/quiz/getResult", quiz)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const data = response.data
      return { kind: "ok", data }
    } catch (e) {
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
