import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

interface DeleteQuestionUseCaseResponse {}

// aqui precisa abrigar apenas a lógica que usa a maquinaria para fazer o que
// a regra de negócio pede...para reproduzir o cenário do zero usamos testes
export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const questionFinded = await this.questionsRepository.findById(questionId)

    if (!questionFinded) {
      throw new Error('Question not found')
    }

    // se o autor da deleção não for o author da pergunnta, bloqueia
    if (authorId !== questionFinded.authorId.toString()) {
      throw new Error('Not allowed')
    }
    await this.questionsRepository.delete(questionFinded)

    return {}
  }
}
