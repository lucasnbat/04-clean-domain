import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
  // feito inicialmente para achar pergunta antes de deletar
  findById(id: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  // save: para salvar question dentro de caso de uso de edição
  save(question: Question): Promise<void>
}
