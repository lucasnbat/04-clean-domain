import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentsRepository {
  create(answer: QuestionAttachment): Promise<void>
  findById(id: string): Promise<QuestionAttachment | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<QuestionAttachment[]>
  delete(questionAttachment: QuestionAttachment): Promise<void>
}
