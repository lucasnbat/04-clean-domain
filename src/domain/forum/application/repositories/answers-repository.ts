import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  // recebe o objeto answer para gravar no banco
  create(answer: Answer): Promise<void>
}
