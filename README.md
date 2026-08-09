
# 🚀 GestorPro — Gestão de tarefas para equipes remotas

![Status](https://img.shields.io/badge/status-demo-blueviolet?style=flat-square)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

**GestorPro** é um painel de gestão de tarefas estilo Kanban, desenvolvido para simular a operação de equipes remotas com automações inteligentes. O projeto apresenta uma interface moderna, escura e responsiva, com foco em usabilidade e experiência visual.

> ⚠️ **Aviso:** Esta é uma demonstração visual estática (frontend puro). Os dados são armazenados apenas em memória e são reiniciados ao recarregar a página.

![Preview do GestorPro](https://via.placeholder.com/800x400/161320/8b5cf6?text=GestorPro+-+Dashboard+Preview)
*(Substitua o link acima por um print real do seu projeto, se desejar)*

---

## ✨ Funcionalidades

- **📋 Quadro Kanban interativo**
  - Colunas: "A fazer", "Em andamento" e "Concluído".
  - Suporte a **Drag and Drop** para mover tarefas entre colunas.

- **➕ Criação de tarefas**
  - Modal intuitivo para adicionar novas tarefas.
  - Definição de título, responsável, prioridade (Baixa/Média/Alta) e prazo.

- **🤖 Motor de Automação (Simulado)**
  - **Distribuição automática:** Atribui novas tarefas automaticamente ao membro da equipe com menor carga de trabalho.
  - **Alerta de atraso:** Verifica periodicamente tarefas com prazo vencido e notifica no feed.
  - **Arquivar concluídas:** (Simulação) Regra para movimentar tarefas antigas.
  - **Feed ao vivo:** Simula eventos via WebSocket, exibindo log de ações e automações.

- **👥 Gestão da Equipe**
  - Visualização de membros com status (online/ausente).
  - Contagem de tarefas ativas por pessoa.

- **📊 Estatísticas em tempo real**
  - Total de tarefas, em andamento, atrasadas e percentual de conclusão.

- **🎨 Design e Experiência**
  - Tema escuro com gradientes neon e efeitos de vidro (Glassmorphism).
  - Animações suaves e feedback visual (toasts, hover, drag-over).
  - Totalmente responsivo para mobile e desktop.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica do projeto.
- **CSS3:**
  - Variáveis CSS (Custom Properties) para temas.
  - Grid Layout e Flexbox.
  - Animações @keyframes.
  - Backdrop-filter para efeito blur.
- **JavaScript (Vanilla):**
  - Manipulação do DOM.
  - API nativa de Drag and Drop.
  - Simulação de eventos assíncronos (setInterval).
  - Arquitetura modular.

---

## 📂 Estrutura do Projeto

```text
/gestorpro/
│
├── index.html          # Página principal e estrutura HTML
├── style.css           # Todos os estilos do sistema
├── script.js           # Toda a lógica de negócio e interações
└── img/
    └── gestor-removebg-preview.png   # Ícone/favicon do projeto
```

---

## 🚀 Como executar

Como o projeto é estático, você pode executá-lo de diversas maneiras:

1.  **Método direto:**
    - Faça o download de todos os arquivos.
    - Mantenha a estrutura de pastas (`index.html`, `style.css`, `script.js` e `img/`).
    - Dê dois cliques no arquivo `index.html` para abrir no seu navegador.

2.  **Com Live Server (Recomendado para desenvolvimento):**
    - Instale a extensão "Live Server" no VSCode.
    - Clique com o botão direito no `index.html` e selecione "Open with Live Server".

---

## 🧑‍💻 Como usar

1.  **Criar uma tarefa:**
    - Clique no botão **"+ Nova tarefa"** no canto superior direito ou no botão **"+ adicionar tarefa"** dentro de qualquer coluna.
    - Preencha os dados e clique em "Criar tarefa".
    - *(Se a regra de "Distribuição automática" estiver ativa, o responsável será escolhido pelo sistema).*

2.  **Mover uma tarefa:**
    - Clique e segure qualquer cartão (card) e arraste-o para outra coluna.
    - Solte o cartão para atualizar o status.

3.  **Remover uma tarefa:**
    - Passe o mouse sobre qualquer cartão e clique no ícone **"✕"** que aparece no canto superior direito.

4.  **Gerenciar automações:**
    - No painel lateral direito, clique nos botões de alternância (toggle) ao lado de cada regra para ativar ou desativar a simulação das automações.

---

## 🧩 Personalização

Quer ajustar a equipe ou as tarefas padrão? É muito fácil!

- **Mudar a equipe (pessoas):**
  - Abra o arquivo `script.js` e localize a constante `people`.
  - Adicione, remova ou edite os objetos (id, name, color, status).

- **Mudar as tarefas iniciais:**
  - No mesmo arquivo, localize a variável `tasks`.
  - Modifique os objetos respeitando o formato: `{ id, title, owner, prio, due, status }`.

- **Ajustar cores e temas:**
  - Todas as cores principais estão definidas no seletor `:root` dentro do arquivo `style.css`.

---

## 📝 Licença

Este projeto é apenas uma demonstração educacional. Sinta-se à vontade para usá-lo, estudá-lo ou modificá-lo como base para seus próprios projetos.

---

## 📬 Contato / Sugestões

Se tiver dúvidas ou sugestões de melhoria, fique à vontade para abrir uma *issue* ou entrar em contato.

---

**Feito com 💜 e JavaScript.**
```