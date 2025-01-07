import { AgregateRoot } from '../entities/agregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'

import { DomainEvent } from './domain-event'

type DomainEventCallback = (event: any) => void

export class DomainEvents {
  // handlersMap tem o nome do evento (string) e a função que será chamada
  // ao checar o nome do evento (ela sera do tipo DomainEventCallback)
  // É um vetor de funções do tipo DomainEventCallback porque posso ter vários
  // subscribers com várias funções que podem ser chamadas dependendo do
  // evento (tipo string) que é detectado
  private static handlersMap: Record<string, DomainEventCallback[]> = {}

  // marca quais agregados da aplicação tem eventos pendentes (ex: answers
  // que já estão salvas no BD e que estão com ready = true, mas ainda não
  // foram disparados )
  private static markedAggregates: AgregateRoot<any>[] = []

  // serve para marcar o agregado dentro do array acima (markedAgreggates)
  public static markAggregateForDispatch(aggregate: AgregateRoot<any>) {
    // se não achou o agregado com id passado na lista, agreggateFound = false
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    // !false = true -> agregado sera adicionado na lista de eventos pendentes
    if (!aggregateFound) {
      this.markedAggregates.push(aggregate)
    }
  }

  // método que será chamado pelo banco de dados para fazer o ready ficar
  // true e fazer o subscriber disparar o evento de notificação, por ex
  // é o método que dispara o evento em si
  private static dispatchAggregateEvents(aggregate: AgregateRoot<any>) {
    // veja que ele vai pegar a minha resposta, o meu agregado, ir dentro
    // dos eventos que ele pré disparou com addDomainEvent() e disparar um
    // a um
    aggregate.domainEvents.forEach((event: DomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AgregateRoot<any>,
  ) {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate))

    this.markedAggregates.splice(index, 1)
  }

  // função utilitaria para achar id do agreggate marcado como pendente
  private static findMarkedAggregateByID(
    id: UniqueEntityID,
  ): AgregateRoot<any> | undefined {
    return this.markedAggregates.find((aggregate) => aggregate.id.equals(id))
  }

  // aqui parece uma superfunção que recebe agregados e dispara todos os eventos
  // de cada um.
  public static dispatchEventsForAggregate(id: UniqueEntityID) {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      // pega agregado e dispara todos os eventos pre disparados dele
      this.dispatchAggregateEvents(aggregate)

      // limpa a lista de eventos do agregado
      aggregate.clearEvents()

      // remove o agregado da lista de agregados que tem eventos pendentes
      // de disparo
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(
    callback: DomainEventCallback,

    eventClassName: string,
  ) {
    const wasEventRegisteredBefore = eventClassName in this.handlersMap

    if (!wasEventRegisteredBefore) {
      this.handlersMap[eventClassName] = []
    }

    this.handlersMap[eventClassName].push(callback)
  }

  public static clearHandlers() {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates() {
    this.markedAggregates = []
  }

  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name

    const isEventRegistered = eventClassName in this.handlersMap

    if (isEventRegistered) {
      const handlers = this.handlersMap[eventClassName]

      for (const handler of handlers) {
        handler(event)
      }
    }
  }
}
