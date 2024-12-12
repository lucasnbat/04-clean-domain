import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string // identificar se é o author da pergunta
  answerId: string // identificar a resposta-alvo
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    // vai usar dois repos
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    // busca a resposta gravada no banco de dados
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    // busca a pergunta a qual a resposta está relacionada
    const question = await this.questionsRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found')
    }

    // se o author for diferente do author da pergunta, BANIDO
    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed')
    }

    // se der certo, elege a resposta como melhor resposta usando
    // os métodos de edição do repositório de questions (método save())
    question.bestAnswerId = answer.id

    await this.questionsRepository.save(question)

    return {
      question,
    }
  }
}
