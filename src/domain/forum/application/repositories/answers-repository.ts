import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  // recebe o objeto answer para gravar no banco
  create(answer: Answer): Promise<void>
  findById(id: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
}
