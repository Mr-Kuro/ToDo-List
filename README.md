# 📝 ToDo List App

Uma aplicação moderna de lista de tarefas desenvolvida com React, TypeScript e Zustand, oferecendo uma experiência completa de gerenciamento de tarefas com sistema de autenticação.

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação

- **Cadastro de usuários** com validação de formulários
- **Login/Logout** com persistência de sessão
- **Proteção de rotas** com sistema de gate
- **Dados persistidos** no localStorage

### 📋 Gerenciamento de Tarefas

- **Criar novas tarefas** com título e descrição
- **Marcar como concluída/pendente** com toggle de status
- **Excluir tarefas** indesejadas
- **Visualização em tempo real** com countdown de tempo
- **Filtragem por usuário** - cada usuário vê apenas suas tarefas
- **Interface responsiva** adaptada para desktop e mobile

### 🎨 Interface e UX

- **Design moderno** com Tailwind CSS
- **Componentes reutilizáveis** com shadcn/ui
- **Ícone flutuante** para acesso rápido
- **Animações suaves** e transições
- **Tema consistente** em toda aplicação

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server ultra-rápido
- **React Router DOM** - Roteamento client-side

### Estado e Dados

- **Zustand** - Gerenciamento de estado global
- **Immer** - Atualizações imutáveis do estado
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas TypeScript

### Estilização

- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones SVG
- **CSS Modules** - Estilos componente-específicos

### Qualidade de Código

- **ESLint** - Linting e padronização
- **Vitest** - Framework de testes
- **Testing Library** - Utilitários para testes
- **TypeScript** - Verificação de tipos

## 📁 Estrutura do Projeto

```text
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Form/           # Componentes de formulário
│   ├── Header/         # Cabeçalho da aplicação
│   ├── Table/          # Componentes de tabela
│   └── ...
├── containers/         # Containers principais
│   ├── Todoes/        # Funcionalidades de tarefas
│   └── Users/         # Funcionalidades de usuários
├── models/            # Tipos TypeScript e DTOs
├── store/             # Gerenciamento de estado (Zustand)
├── utils/             # Funções utilitárias e hooks
└── lib/               # Configurações e utilitários
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/Mr-Kuro/ToDo-List.git
cd ToDo-List
```

1. **Instale as dependências:**

```bash
npm install
```

1. **Execute em modo de desenvolvimento:**

```bash
npm run dev
```

1. **Acesse a aplicação:**

Abra <http://localhost:5173> no seu navegador

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build           # Gera build de produção
npm run preview         # Preview do build de produção

# Testes
npm run test            # Executa testes
npm run test:watch      # Executa testes em modo watch
npm run test:ui         # Interface visual para testes
npm run test:cov        # Relatório de cobertura

# Linting
npm run lint            # Executa linting
npm run eslint-fix      # Corrige problemas de linting automaticamente
```

## 🎯 Funcionalidades Detalhadas

### Sistema de Autenticação

- Formulários de cadastro e login com validação
- Persistência de sessão usando localStorage
- Proteção de rotas com componente GateUser
- Dados de usuário mockados para demonstração

### Gerenciamento de Estado

- **Zustand** para estado global
- **Immer** para atualizações imutáveis
- **Persistência** automática no localStorage
- **DevTools** habilitadas para debug

### Interface Responsiva

- Layout adaptativo para diferentes telas
- Componentes mobile-first
- Tabelas responsivas com scroll areas
- Ícones e animações suaves

## 🔧 Configurações

### Tailwind CSS

Configurado com:

- Tema personalizado
- Animações customizadas
- Plugins do Radix UI
- Variáveis CSS personalizadas

### TypeScript

Configuração rigorosa com:

- Strict mode habilitado
- Path mapping (@/\* para src/\*)
- Tipos customizados para toda aplicação

### Testes

Setup com:

- Vitest como test runner
- Testing Library para testes de componentes
- jsdom para ambiente de navegador
- Cobertura de código configurada

## 🤝 Contribuindo

1. **Fork** o projeto
1. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
1. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
1. **Push** para a branch (`git push origin feature/AmazingFeature`)
1. **Abra** um Pull Request

## 📄 Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autor

**Anderson Queiroz** - [@Mr-Kuro](https://github.com/Mr-Kuro)

---

**Nota:** Este é um projeto de estudos demonstrando o uso de tecnologias modernas do React ecosystem com foco em deseonvolvimento prático e escalável.
