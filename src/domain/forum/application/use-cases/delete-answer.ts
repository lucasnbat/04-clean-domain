import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface DeleteAnswerUseCaseResponse {}

// aqui precisa abrigar apenas a lógica que usa a maquinaria para fazer o que
// a regra de negócio pede...para reproduzir o cenário do zero usamos testes
export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answerFinded = await this.answersRepository.findById(answerId)

    if (!answerFinded) {
      throw new Error('Answer not found')
    }

    // se o autor da deleção não for o author da pergunnta, bloqueia
    if (authorId !== answerFinded.authorId.toString()) {
      throw new Error('Not allowed')
    }
    await this.answersRepository.delete(answerFinded)

    return {}
  }
}
