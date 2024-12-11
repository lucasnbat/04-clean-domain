import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

// isso é o repositório fake em memória tipado com a estrutura
// do repositório em `test/repositories/in-memory-questions-repository
// que por sua vez implementa o contrato/classe em
// `application/repositories/questions-repository.ts`
let inMemoryQuestionsRepositoryInstance: InMemoryQuestionsRepository

// aqui é o caso de uso com a regra de negóio...ele vai usar o repositório
// instanciado anteriormente. Ele (o caso de uso) é o s.u.t (system under
// test). Você pode renomear para sut se quiser
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    // inicializa o repositório fake que simula a infra/maquinaria
    inMemoryQuestionsRepositoryInstance = new InMemoryQuestionsRepository()

    // inicializa o caso de uso e arma ele com o repositório recém carregado
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepositoryInstance)
  })

  it('should be able to create a question', async () => {
    // usa a função do caso de uso, agora carregado com o repo. fake
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepositoryInstance.items[0].id).toEqual(question.id)
  })
})
