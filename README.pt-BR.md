# 🏥 Sistema de Farmácia

[![Licença: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Último Commit](https://img.shields.io/github/last-commit/vitor-de-matos/farmacia-nest-treino)](https://github.com/vitor-de-matos/farmacia-nest-treino/commits)
[![Estrelas](https://img.shields.io/github/stars/vitor-de-matos/farmacia-nest-treino?style=social)](https://github.com/vitor-de-matos/farmacia-nest-treino)

📄 Este README também está disponível em [English 🌎](./README.md)

---

## 💡 Descrição

Projeto backend de um sistema de gerenciamento de farmácia desenvolvido com NestJS, utilizando PostgreSQL e TypeORM. Permite controle de estoque, vendas, cadastro de produtos e funcionários.

---

## 🛠️ Tecnologias

- Node.js
- NestJS
- TypeORM
- PostgreSQL
- JWT para autenticação
- Swagger para documentação
- Multer para upload de arquivos
- Dotenv para variáveis de ambiente
- Class-validator para validações
- Filtro global de exceções

---

## 📦 Instalação

```bash
git clone https://github.com/vitor-de-matos/farmacia.git
cd farmacia
npm install
cp .env.example .env
```

> ✏️ Edite o arquivo `.env` com os dados do seu PostgreSQL e outras configurações.

```bash
npm run start:dev
```

> ⚠️ As tabelas são criadas automaticamente se a conexão com o banco for válida.

---

## 🧪 Seed

```bash
npm run start:seed
```

Esse comando cria um **usuário administrador**:

- Login: `admin`
- Senha: `admin`

> 🔒 Recomenda-se alterar a senha após o login inicial.

---

## 🚪 Rotas Protegidas

A maioria das rotas exige autenticação com JWT. Após o login, utilize o token no cabeçalho da requisição:

```
Authorization: Bearer <token>
```

---

## 📄 Documentação Swagger

Acesse a documentação interativa da API:

```
http://localhost:3000/api
```

> A documentação já está parcialmente configurada com os DTOs. Melhorias como exemplos e respostas de erro estão previstas.

---

## 📁 Estrutura do Projeto

```
src/
├── auth/               # Autenticação (login, JWT)
├── batch/              # Lotes de produtos
├── batchPromotion/     # Promoções por lote
├── category/           # Categorias de produtos
├── employee-login/     # Acesso de funcionários
├── itemSale/           # Itens das vendas
├── manufacturer/       # Fabricantes
├── media/              # Upload e tratamento de arquivos
├── payment/            # Lógica de pagamento
├── person/             # Pessoas (clientes, funcionários)
├── products/           # Gerenciamento de produtos
├── sales/              # Vendas e pedidos
├── shared/             # Componentes reutilizáveis (DTOs, filtros, configs)
├── stock/              # Controle de estoque
├── app.module.ts       # Módulo raiz da aplicação
├── main.ts             # Arquivo principal
├── seed.ts             # Script de inicialização de dados
```

---

## 📌 Funcionalidades

- ✅ Autenticação com JWT
- ✅ Cadastro de produtos, categorias e fabricantes
- ✅ Controle de estoque por lote e validade
- ✅ Registro de vendas com múltiplos itens
- ✅ Upload de imagens de produtos
- ✅ Paginação e filtros
- ✅ Documentação Swagger
- ✅ Seed automático com usuário admin
- ✅ Tratamento centralizado de erros
- ✅ Validações com DTOs

---

## 📈 Melhorias Futuras

- Padronização das respostas da API
- Swagger com exemplos de requisição e respostas de erro
- Exceções customizadas
- Logger estruturado (ex: Winston ou Pino)
- Testes unitários e de integração
- Dockerização
- Controle de permissões por tipo de usuário

---

## 📢 Aviso

> Este projeto foi criado com fins de estudo em NestJS.  
> Algumas funcionalidades ainda estão em desenvolvimento ou podem ser otimizadas.  
> Sinta-se à vontade para usar, testar ou contribuir.

---

## 📄 Licença

Este projeto está licenciado sob os termos da Licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
