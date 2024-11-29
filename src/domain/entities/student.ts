import { Entity } from "../../core/entities/entity"

interface StudentProps {
  name: string
}

class Student extends Entity<StudentProps> {
  // importante lembrar que `props: StudentProps` refere-se a um objeto que será
  // passado para o construtor contendo os atributos do objeto a instanciar (no
  // caso, o atrib. name)
}