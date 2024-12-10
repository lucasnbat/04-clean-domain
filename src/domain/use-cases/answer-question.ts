import { Answer } from "../entities/answer"
import { AnswerRepository } from "../repositories/answers-repository"

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    // isso abaixo que vai efetivamente gravar a resposta no banco com uma 
    // lógica de negócio própria dentro dele, é uma maquinaria tipo um prisma,
    // um TypeORM, um Sequelize...
    private answersRepository: AnswerRepository
  ) { }

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId
    }) // vai gerar uma nova answer

    // mesmo que não tenha o create() implementado ainda passo a answer e ele a-
    // ceita porque a assinatura dele em repositories/answers-repository permite
    await this.answersRepository.create(answer)

    return answer
  }
}

