import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepositoryInstance: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepositoryInstance = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepositoryInstance)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Contéudo da resposta',
    })

    // lembre que agora result é na verdade uma instância da
    // classe Right {} CONTENDO o value que é o resultado do
    // processamento do use case
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepositoryInstance.items[0]).toEqual(
      result.value?.answer, // usa ? pois resultado pode ser sucesso ou falha
    )
  })
})
