import { Entity } from "../../core/entities/entity"

interface AnswerProps {
  content: string
  authorId: string
  questionId: string
}

// passando a interface AnswerProps como generic, estou dizendo que a classe 
// precisa ter os atributos dessa interface e que o construtor tambem deve validar
// se os dados que ele recebeu batem com os dados que estão na classe
export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }
}