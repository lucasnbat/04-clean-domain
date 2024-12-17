# DDD e Node.js

## Design de software e DDD

- Área de entendimento onde todas as pessoas envolvidas tem conhecimentos bem
  estabelecidos;
- Dois componentes importantes:
  - Domain experts;
    - Clientes inclusos;
    - São as pessoas do dia a dia que lidam com o que você quer automatizar;
    - Conversa --> ganhar entendimento da área em questão;
  - Linguagem ubíqua;
    - Linguagem universal onde todas as pessoas (de negócio e programadores) po-
      dem conversar livremente com facilidade;
- DDD é uma abordagem para essa pesquisa e consulta na fase de análise pré-pro-
  jeto;
- Clean Architecture é só uma forma de arquitetura técnica para a aplicação, tal
  como MVC, etc...

## Entidades e casos de uso

- O conceito de Clean Architecture é criar um núcleo interno de software tão lim-
  po que seja possível tirar ele de um projeto e acoplar em outro levando todos os
  códigos, use cases, testes... desde que o projeto destino seja um projeto JS/TS,
  claro;
- Isso faz o código ser independente de camadas externas, imune a mudanças ines-
  peradas de versão e etc.;

### Prática

- Inicie um projeto com npm;
- instale : `npm install typescript @types/node -D`
- `npx tsc --init` para criar o `tsconfig.json`
- Entidades são os entes envolvidos numa história (aluno, dúvida) e os casos de
  uso são como essas entidades conversam entre si (responder, criar...);
- Software é um organismo orgânico, vivo, que evolui com o tempo;

## Primeiro caso de uso

- Princípio de responsabilidade única (SOLID): um arquivo, um use-case;
- Instale o vitest (`npm install vitest -D`)
- `npx vitest run` para rodar os testes;

## Mapeando relacionamentos

- Nem todo relacionamento entre entidades vai gerar um relacionamento entre
  tabelas...as vezes vai ficar tudo numa tabela só;
- Pense que todas as entidades e use cases agora precisam ser legíveis para 
  todos os stakeholders e envolvidos... então não precisa ficar louco querendo
  que student e instructor sejam tudo `user.ts` por exemplo...

## Dependencias externas

- Pelo que entendi a forma principal de comunicação com dep. externas são os
  repositórios;
- Veja só:
  - O Use Case está no nível maior
  - Ele usa os métodos dos repositórios que tem lógica de negócio internas

## Value Object de slug

- Aparentemente Value Object é toda propriedade que por si só pode ter várias 
  regras de negócio envolvidas com ela.
  - Ex: slug. Ele pode ser gerado automaticamente, ou gerado a partir do usuário,
    vai precisar de regras de validação, etc;
  - Para lidar com isso...cria um objeto Slug (classe) e usa como tipo no atri-
    buto slug;

## Classe base de entidades

- Coloca na pasta `core/entities/` a base de entidades da aplicação...isso porque
  vemos padrões nas entidades. Todas tem um id, todas tem um construtor... então
  vamos colocar o que é comum num arquivo `entity.ts` e fazer as classes extende-
  rem a classe dentro dele.
- A pasta `core/` serve para colocar tudo que pode ser compartilhado na aplicação;

## Sobre constructor `protected`

- Em um ponto da aula "Abstraindo criação de entidades", o Diego fala que, ao dei-
  xar o construtor de `Entity` como `protected`, se você está dentro da 
  `AnswerQuestionUseCase` você não pode dar `new Answer()` por que isso seria in-
  vocar um método protegido apenas acessível dentro de classes que HERDAM a clas-
  se `Entity`. 
- Como a `AnwerQUestionUseCase` não herda a `Entity`, vai dar erro ao dar 
  `new Answer({...})`. 
- Agora se você tenta fazer `new Answer()` dentro da própria classe `Answer`, aí
  vai funcionar porque ela herda `Entity`;

## Sobre sequência de construção

1. Identificação de entidades e casos de uso
2. Mapeou relacionamentos entre classes
3. Abordou dependências externas (repositories onde criou só a assinatura da função)
4. Value Objects
5. Criou a classe base `Entity` e simplificou entidades
6. Value Object do ID
7. Mapeamento de propriedades
8. Abstraiu criação de entidades (método estático `create()`)

## Usando vitest de forma global sem precisar importar funções

- Você instala `npm install vitest-tsconfig-paths -D`
- Depois cria o `vite.config.ts` referenciando:
  ```vim
  test: {
    globals: true,
  }
  ```
- Depois vai no `tsconfig.json` e:
  ```vim
  "types": [
    "vitest/globals"
  ]
  ```

## Eslint

- `npm install eslint @rocketseat/eslint-config -D`
- `npm install eslint-plugin-vitest-globals@latest --save-dev` 
- Cria arquivo `.eslintrc.json` contendo:
  ```vim
  {
    "extends": [
      "@rocketseat/eslint-config/node",
      "plugin:vitest-globals/recommended"
    ],
    "env": {
      "vitest-globals/env": true
    }
  }
  ```
- scripts no `package.json`:
  ```vim
  "lint": "eslint src --ext .ts",
   "lint:fix": "eslint src --ext .ts --fix"
  ```

# Clean Architecture

- Desacoplamento: buscar não tornar o seu software muito acoplado/ depedente
  de camadas externas, como a de infraestrutura;
- Camadas:
  - Azul, externa - Camada de Infraestrutura: onde o usuário tem o primeiro
    contato com o sistema (UI, banco de dados);
  - Verde - Interface Adapters: é a camada que adapta, formata os dados vindos
    da camada mais externa (azul) para as camadas mais internas entenderem;
    - Missão de proteger as camadas de use cases e de entidades da implementação
      direta da camada azul/infraestrutura;
      - SOLID - Inversão de dependência: evitar que os casos de uso dependam da
        camada de infraestrutura, mas sim de um contrato/assinatura que qualquer
        outra ferramenta/lib possa se adaptar para servir a aplicação;
    - As camadas não devem precisar saber de detalhes de outras camadas, permi-
      tindo desacoplar da camada de infraestrutra e ser implantado em outro pro-
      jeto; isso especialmente no use cases;
    - As camadas internas NÃO podem importar coisas das camadas mais externas (
      ex: uma Entidade/classe não pode importar coisas de um use case, mas o con-
      trário pode acontecer)
  - Vermelha - use cases/ application
  - Amarela - entities/ enterprise

## Refatorando pastas

- Podem haver subdomínios, setores do problema que está em foco;
- A organização fica:
  - domain
    - forum (subdominio)
      - application (onde estão use cases e repositories)
        - use cases
        - repositories
      - enterprise (onde ficam as entities)
        - entities

## Lógica sequencial

- Você tem repositórios fake que simulam o prisma;
  - Eles implementam um contrato que você determina em `application/repositories`;
  - Esses repositórios contém funções relativas a algo (findbySlug, create,
    edit, delete...)
- Você tem casos de uso com lógicas internas que usam os repositórios falsos
  como dependências deles;
  - Eles são tipados com classes de Request e Response
  - E possuem como função principal a `execute()`
- **O que você está fazendo é:**
  - Abordagem para problema: DDD;
  - Arquitetura: Clean Architecture -> desacoplamento (camada externas apenas
    dependendo das mais internas, não o contrário);
  - SOLID (inversão de dependência) -> repositórios;
  - Design Patterns -> factories;

## Gerando dados "fake"

- `npm install @faker-js/faker -D`

# Estratégias de Error Handlering

- Mais tradicional: `throw new Error('mensagem')`
  - `throw` coloca exceção na aplicação 
  - logo, você PRECISA usar `trycatch` na chamada dessa função
    que tem o `throw` para tratar esse erro e mandar de forma 
    melhor para o front-end, se não você vai imprimir uma pilha
    de erros horrível no front-end;
  - instanciando apenas `Error` você não tem personalização para
    tipos de erro diferente...

## Functional error handlering

- Usa funções para retornar sucesso ou falha;
- Classe que vai tratar error handlering em `either.ts`
- Convenção:
  - Left para caso dê errado, Right caso dê certo;
- Fluxo normal se tudo dá certo sempre é para a direita:
  - UI -> CONTROLLER -> USE CASE -> ENTIDADE -> USE CASE -> REPOSITÓRIO -> BD

## Erros genéricos

- Mesmo esquema: pasta `erros/` em `use-cases/` contendo erros
  específicos que extendem a classe `Error`, mas com o diferencial
  de implementarem a interface `UseCaseError` presente em 
  `core/errors/use-case-error.ts`
  - É usada essa interface para diferenciar os erros que acontecem 
    na camada de use cases dos outros;