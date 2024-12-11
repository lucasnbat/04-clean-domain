import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      // na requisição vai vir como string, mas a classe processa como
      // UniqueEntityID, o que faz necessário converter a string para isso
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    // passa para a parte de infra que vai salvar (prisma, TypeOrm...)
    await this.questionsRepository.create(question)

    return {
      question,
    }
  }
}
