import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

// Repositório fake de Questions que busca simular o que uma maquinaria
// como o prisma, typeOrm, sequelize fariam, mas numa versão apenas em
// memória (usando vetores)
export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  // essa função simula um prisma.question.create({}) por ex
  async create(question: Question) {
    this.items.push(question)
  }
}
