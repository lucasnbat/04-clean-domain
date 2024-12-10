// isso permite você passar um tipo e depois informar qual das chaves do 
// objeto de tipagem você quer que virem opcionais

// 1. Pick<Partial<T>, K>
// Partial<T> transforma todas as propriedades do tipo T em opcionais.
// Pick<...> seleciona apenas as propriedades de T que estão no conjunto K (as que você quer tornar opcionais).

// 2. Omit<T, K>:
// Remove do tipo T as propriedades especificadas em K (as que você marcou como opcionais).

// 3. Pick<Partial<T>, K> & Omit<T, K>:
// Combina o resultado:
// As propriedades em K agora são opcionais.
// As demais propriedades de T permanecem como estavam (obrigatórias).

/**
 * Make some property optional on type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Optional<Post, 'id' | 'email'>
 * ```
 **/

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>