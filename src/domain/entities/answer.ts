import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"

interface AnswerProps {
  content: string
  authorId: UniqueEntityID
  questionId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date // para inserir flag de "editada" na resposta
}

// passando a interface AnswerProps como generic, estou dizendo que a classe 
// precisa ter os atributos dessa interface e que o construtor tambem deve validar
// se os dados que ele recebeu batem com os dados que estão na classe

// essa classe chama o construtor da Entity implicitamente...não precisa de usar
// o super() para configurar esse comportamento, a menos que você queira.

// O fluxo no fim é: Na entity, a classe tem as props (Entity<Props>) que são 
// passadas para o atributo protected "props".
// O construtor então cria um objeto com essas props e um id (que se não for in-
// formado pelo usuário, vai ser criado pela randomUUID())
// Se eu estou definindo 
export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
}