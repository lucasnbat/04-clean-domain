import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'
import { ReadNotificationUseCase } from './read-notification'

let inMemoryNotificationsRepositoryInstance: InMemoryNotificationsRepository

let sut: ReadNotificationUseCase

describe('Read Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepositoryInstance =
      new InMemoryNotificationsRepository()

    sut = new ReadNotificationUseCase(inMemoryNotificationsRepositoryInstance)
  })

  it('should be able to read a notification', async () => {
    // // usa a função do caso de uso, agora carregado com o repo. fake
    // const result = await sut.execute({
    //   recipientId: '1',
    //   title: 'Nova notificação',
    //   content: 'Conteúdo da notificação',
    // })
    // expect(result.isRight()).toBe(true)
    // expect(inMemoryNotificationsRepositoryInstance.items[0]).toEqual(
    //   result.value?.notification,
    // )
  })
})
