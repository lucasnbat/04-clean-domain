import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'

let inMemoryQuestionsRepositoryInstance: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    // inicializa o repositório fake que simula a infra/maquinaria
    inMemoryQuestionsRepositoryInstance = new InMemoryQuestionsRepository()

    // inicializa o caso de uso e arma ele com o repositório recém carregado
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepositoryInstance)
  })

  it('should be able to delete a question', async () => {
    // chamando factory que vai criar a pergunta
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepositoryInstance.create(newQuestion)
    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(inMemoryQuestionsRepositoryInstance.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    // chamando factory que vai criar a pergunta
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepositoryInstance.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
