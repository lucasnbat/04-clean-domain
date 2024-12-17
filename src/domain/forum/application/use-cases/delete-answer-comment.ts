import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string // garantir que apenas autor do comenta´rio possa deletar
  answerCommentId: string
}

// tipa que a resposta vai ser ou um erro (left) que será string
// (porque retorna uma mensagem string) ou um objeto nulo (porque
// em caso de sucesso está retornando nulo (right({}))
type DeleteAnswerCommentUseCaseResponse = Either<string, {}>

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
      return left('Answer comment not found')
    }

    // verifica se é o autor do comentário
    if (answerComment.authorId.toString() !== authorId) {
      return left('Not allowed')
    }

    // se for o autor do comentário, permite deletar
    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
