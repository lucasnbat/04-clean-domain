import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepositoryInstance: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Get Answer By Slug', () => {
  beforeEach(() => {
    // inicializa o repositório fake que simula a infra/maquinaria
    inMemoryAnswersRepositoryInstance = new InMemoryAnswersRepository()

    // inicializa o caso de uso e arma ele com o repositório recém carregado
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepositoryInstance)
  })

  it('should be able to delete a answer', async () => {
    // chamando factory que vai criar a resposta
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    inMemoryAnswersRepositoryInstance.create(newAnswer)
    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepositoryInstance.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    // chamando factory que vai criar a pergunta
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    inMemoryAnswersRepositoryInstance.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
