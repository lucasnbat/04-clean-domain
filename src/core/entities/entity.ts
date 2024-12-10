import { randomUUID } from "node:crypto"

// o generic Props foi usado no lugar dos anys para permitir que eu pudesse 
// fazer algo como get content() {this.props.content} na classe answer por ex;
// sem o generic, com o any, ele não mostra as opções de tipo possiveis (ctrl + espaço)
// dentro de cada classe, então, eu passo <AnswerProps> no lugar de <Props>, per-
// mitindo eu ter a intelissense do typescript
export class Entity<Props> {
  // privado pois não deve ser acessível a mudanças feitas por outras classes
  private _id: string 
  // atributo generico para referenciar os atributos das classes
  protected props: Props 

  // o que faço é dar um método que DISPONIBILIZE a leitura do id
  get id() {
    return this._id 
  }

  constructor(props: Props, id?: string){
    this.props = props
    this._id = id ?? randomUUID()
  }
}