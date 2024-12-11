import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optional"

interface QuestionProps {
  authorId: UniqueEntityID
  bestAnswerId?: UniqueEntityID // melhor resposta selecionada pelo autor
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  // esse método vai agir como o constructor de Entity: passar as props para os
  // atributos e setar um id do tipo UniqueEntityID
  // porque vamos fazer isso? para permitir preenchimento automático do createdAt()
  // usamos o Optional para que não seja preciso passar createdAt ao criar nova question 
  static create(
    props: Optional<QuestionProps, 'createdAt'>,
    id?: UniqueEntityID) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    }, id)
    return question
  }
}