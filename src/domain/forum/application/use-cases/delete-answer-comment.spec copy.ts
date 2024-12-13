import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository copy'

let inMemoryAnswerCommentsRepositoryInstance: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepositoryInstance =
      new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerCommentUseCase(
      inMemoryAnswerCommentsRepositoryInstance,
    )
  })

  it('should be able to delete comment of a answer', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentsRepositoryInstance.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepositoryInstance.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryAnswerCommentsRepositoryInstance.create(answerComment)

    expect(() => {
      return sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
