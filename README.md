# 📝 Lista de Tarefas PRO

Uma aplicação web moderna e completa para gerenciamento de tarefas com recursos avançados como drag-and-drop, filtros inteligentes, sistema de tags e persistência local.

![Status](https://img.shields.io/badge/status-concluído-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Funcionalidades

### 🎯 Gerenciamento de Tarefas

- ✅ Adicionar tarefas com descrição personalizada
- ✅ Marcar tarefas como concluídas
- ✅ Excluir tarefas individualmente
- ✅ Limpar todas as tarefas concluídas de uma vez

### 🏷️ Sistema de Prioridades e Tags

- 🔴 **Alta Prioridade** - Para tarefas urgentes
- 🟡 **Média Prioridade** - Para tarefas importantes
- 🟢 **Baixa Prioridade** - Para tarefas menos urgentes
- 🏷️ **Tags personalizadas** - Organize por categorias (trabalho, pessoal, estudos, etc.)

### 🔍 Filtros Inteligentes

- **Por Status**: Visualize todas, apenas pendentes ou apenas concluídas
- **Por Prioridade**: Filtre por alta, média, baixa ou todas
- **Busca em Tempo Real**: Pesquise no texto das tarefas ou nas tags

### 🎨 Drag and Drop

- Arraste e solte tarefas para reorganizar a ordem
- Interface intuitiva com feedback visual
- Funciona mesmo com filtros ativos

### 💾 Persistência de Dados

- **LocalStorage**: Todas as tarefas são salvas automaticamente no navegador
- **Sem necessidade de backend**: Funciona offline
- **Dados persistentes**: Suas tarefas permanecem mesmo após fechar o navegador

### 📊 Estatísticas em Tempo Real

- Total de tarefas
- Tarefas pendentes
- Tarefas concluídas

## 🚀 Como Usar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Nenhuma instalação adicional necessária!

### Executando o Projeto

#### Opção 1: Abrir diretamente

```bash
# Clone o repositório
git clone https://github.com/FelipeGermanoPassos/lista_de_tarefas_PRO.git

# Entre na pasta do projeto
cd lista_de_tarefas_PRO

# Abra o arquivo index.html no seu navegador
```

#### Opção 2: Com servidor local

```bash
# Usando Python 3
python3 -m http.server 8080

# Ou usando Node.js (com o pacote http-server instalado)
npx http-server -p 8080

# Acesse no navegador: http://localhost:8080
```

## 📖 Guia de Uso

### Adicionando uma Tarefa

1. Digite o texto da tarefa no campo de entrada
2. Selecione a prioridade (Baixa, Média ou Alta)
3. Adicione tags separadas por vírgula (opcional)
4. Clique em "➕ Adicionar" ou pressione Enter

**Exemplo de tags**: `trabalho, urgente, reunião`

### Filtrando Tarefas

- Use os botões de filtro para visualizar apenas as tarefas desejadas
- Combine filtros de status e prioridade
- Use a barra de busca para encontrar tarefas específicas

### Reorganizando Tarefas

- Clique e arraste uma tarefa para movê-la
- Solte sobre outra tarefa para reposicionar

### Gerenciando Tarefas

- ✅ Marque o checkbox para concluir uma tarefa
- 🗑️ Clique no botão de lixeira para excluir
- Use "Limpar Concluídas" para remover todas as tarefas finalizadas

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com animações e gradientes
- **JavaScript (ES6+)** - Lógica da aplicação com classes e módulos
- **LocalStorage API** - Persistência de dados no navegador
- **Drag and Drop API** - Funcionalidade de arrastar e soltar

## 🎨 Características de Design

- **Interface Moderna**: Design clean e intuitivo
- **Tema Escuro**: Cores suaves para reduzir fadiga visual
- **Responsivo**: Funciona em desktop, tablet e mobile
- **Animações Suaves**: Transições e efeitos visuais agradáveis
- **Feedback Visual**: Indicadores claros de interação

## 📂 Estrutura do Projeto

```
lista_de_tarefas_PRO/
│
├── index.html          # Estrutura HTML da aplicação
├── styles.css          # Estilos e animações
├── app.js              # Lógica da aplicação
└── README.md           # Documentação do projeto
```

## 💡 Funcionalidades Técnicas

### Classe TaskManager

A aplicação utiliza programação orientada a objetos para gerenciar as tarefas:

- `loadTasks()` - Carrega tarefas do LocalStorage
- `saveTasks()` - Salva tarefas no LocalStorage
- `addTask()` - Adiciona nova tarefa
- `deleteTask()` - Remove uma tarefa
- `toggleComplete()` - Alterna status de conclusão
- `getFilteredTasks()` - Aplica filtros às tarefas
- `reorderTasks()` - Reorganiza após drag and drop
- `render()` - Atualiza a interface

### Segurança

- Escape de HTML para prevenir XSS (Cross-Site Scripting)
- Validação de entrada antes de adicionar tarefas
- Confirmação antes de excluir tarefas

## 🌟 Exemplos de Uso

### Caso de Uso 1: Gerenciamento de Trabalho

```
Tarefa: "Preparar apresentação para cliente"
Prioridade: Alta
Tags: trabalho, urgente, apresentação
```

### Caso de Uso 2: Estudos

```
Tarefa: "Estudar JavaScript avançado"
Prioridade: Média
Tags: estudos, programação, javascript
```

### Caso de Uso 3: Tarefas Pessoais

```
Tarefa: "Comprar presente de aniversário"
Prioridade: Baixa
Tags: pessoal, compras
```

## 🔄 Atualizações Futuras

Possíveis melhorias para versões futuras:

- [ ] Modo claro/escuro alternável
- [ ] Exportar/importar tarefas (JSON)
- [ ] Datas de vencimento
- [ ] Subtarefas
- [ ] Sincronização na nuvem
- [ ] Notificações
- [ ] Temas personalizáveis

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto é open source e está disponível para uso livre.

## 👨‍💻 Autor

**Felipe Germano Passos**

- GitHub: [@FelipeGermanoPassos](https://github.com/FelipeGermanoPassos)

## 🙏 Agradecimentos

Projeto desenvolvido como demonstração de habilidades em desenvolvimento web front-end, incluindo:

- Manipulação do DOM
- Eventos e interatividade
- LocalStorage API
- Drag and Drop API
- Design responsivo
- Programação orientada a objetos em JavaScript

---

⭐ Se você gostou deste projeto, considere dar uma estrela no repositório!
Uma lista de tarefas para organizar sua vida
