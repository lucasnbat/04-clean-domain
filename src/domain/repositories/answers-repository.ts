import { Answer } from '../entities/answer'

export interface AnswerRepository {
  // recebe o objeto answer para gravar no banco
  create(answer: Answer): Promise<void>
}
