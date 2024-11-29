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