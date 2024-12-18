import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepositoryInstance: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    // inicializa o repositório fake que simula a infra/maquinaria
    inMemoryQuestionsRepositoryInstance = new InMemoryQuestionsRepository()

    // inicializa o caso de uso e arma ele com o repositório recém carregado
    sut = new EditQuestionUseCase(inMemoryQuestionsRepositoryInstance)
  })

  it('should be able to edit a question', async () => {
    // chamando factory que vai criar a pergunta
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepositoryInstance.create(newQuestion)
    await sut.execute({
      authorId: 'author-1',
      title: 'editei-titulo',
      content: 'editei-conteudo',
      questionId: newQuestion.id.toValue(),
    })

    expect(inMemoryQuestionsRepositoryInstance.items[0]).toMatchObject({
      title: 'editei-titulo',
      content: 'editei-conteudo',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    // chamando factory que vai criar a pergunta
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepositoryInstance.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      title: 'editei-titulo',
      content: 'editei-conteudo',
      questionId: newQuestion.id.toValue(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
