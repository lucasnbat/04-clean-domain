import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswersRepositoryInstance: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Get Answer By Slug', () => {
  beforeEach(() => {
    // inicializa o repositório fake que simula a infra/maquinaria
    inMemoryAnswersRepositoryInstance = new InMemoryAnswersRepository()

    // inicializa o caso de uso e arma ele com o repositório recém carregado
    sut = new EditAnswerUseCase(inMemoryAnswersRepositoryInstance)
  })

  it('should be able to edit a answer', async () => {
    // chamando factory que vai criar a pergunta
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    inMemoryAnswersRepositoryInstance.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      content: 'editei-conteudo',
      answerId: newAnswer.id.toValue(),
    })

    expect(inMemoryAnswersRepositoryInstance.items[0]).toMatchObject({
      content: 'editei-conteudo',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    // chamando factory que vai criar a pergunta
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    inMemoryAnswersRepositoryInstance.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        content: 'editei-conteudo',
        answerId: newAnswer.id.toValue(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
