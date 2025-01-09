import { AgregateRoot } from '../entities/agregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'

// classe que representa a criação de um CustomAggregate
class CustomAggregateCreated implements DomainEvent {
  // informações que estou anotando do evento: data e o
  // proprio objeto agregado
  public ocurredAt: Date
  private aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

// CustomAggregate = um agregado qualquer, como o de pergunta
// como ele extende AgregateRoot, é como se ele tivesse tudo
// aquilo que tem no AgregateRoot: ele tem uma lista vetorial
// com todos os eventos pendentes dele
// o método addDomainEvent() permite puxar um evento novo para
// essa lista passando uma classe que representa esse evento,
// no caso, a CustomAggregateCreated
// Esse método create() estático permite criar uma instância
// da própria classe e usar o addDomainEvent para registrar esse
// evento (a criação da instância) e retorna o agregado
class CustomAggregate extends AgregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    // adiciona o evento na lista de eventos que aconteceram
    // passando a classe CusttomAggregateCreated com as informações
    // do aggregate criado.
    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}
