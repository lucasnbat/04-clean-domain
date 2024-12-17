// Error
export class Left<L> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }
}

// Success
export class Right<R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }
}

// criando tipagem que pode apontar para classes Left ou Right
// Associa cada classe a uma letra e tipa as classes que tão acima
export type Either<L, R> = Left<L> | Right<R>

// funções que vão instanciar as classes (poderiam ser métodos static tb)
// depois temos a tipagem de valores de entrada <L, R>
// depois temos a tipagem de valores de saída (Either<L,R>)
export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
