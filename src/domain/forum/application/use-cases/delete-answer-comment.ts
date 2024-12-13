import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string // garantir que apenas autor do comenta´rio possa deletar
  answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    // encontra o comentário da resposta
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    // verifica se é o autor do comentário
    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    // se for o autor do comentário, permite deletar
    await this.answerCommentsRepository.delete(answerComment)

    return { answerComment }
  }
}
