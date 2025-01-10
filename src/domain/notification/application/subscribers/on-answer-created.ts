import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event'

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  // serve para registrar um subscriber no handlersMap do DomainEvents
  setupSubscriptions(): void {
    // passa qual função disparar quando o evento for acionado
    DomainEvents.register(
      // o bind() serve para que, quando a dispacth lá do DomainEvents for
      // disparar, ela reconheça que THIS não vai ser a classe DomainEvents,
      // mas sim ESSA classe aqui, a OnAnswerCreated
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )

    // você pode ter mais eventos registrados, por ex:
    // DomainEvents.register(this.sendBestAnswerNotification, BestAnswerSelected.name)
    // (...)
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    console.log('Macaxera', answer)
  }
}
