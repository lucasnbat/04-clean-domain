import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

// Repositório fake de Questions que busca simular o que uma maquinaria
// como o prisma, typeOrm, sequelize fariam, mas numa versão apenas em
// memória (usando vetores)
export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  // essa função simula um prisma.question.create({}) por ex
  async create(question: Question) {
    this.items.push(question)
  }

  async findById(id: string) {
    // converte o UniqueEntityID interno em string para comparar com a string recebida
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }

  // save recebe um objeto com novos dados...
  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    // e substitui pelos dados recebidos
    this.items[itemIndex] = question
  }

  // retorna questions ordenadas com base no createdAt (mais recentes primeiro)
  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20) // page = 1 ? -> corta da posição 0 a 20

    return questions
  }
}
