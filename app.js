// Classe para gerenciar as tarefas
class TaskManager {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentFilter = "todas";
    this.currentPriorityFilter = "todas";
    this.searchTerm = "";
    this.draggedElement = null;
    this.init();
  }

  // Carrega tarefas do LocalStorage
  loadTasks() {
    const tasksJSON = localStorage.getItem("tasks_pro");
    return tasksJSON ? JSON.parse(tasksJSON) : [];
  }

  // Salva tarefas no LocalStorage
  saveTasks() {
    localStorage.setItem("tasks_pro", JSON.stringify(this.tasks));
  }

  // Adiciona nova tarefa
  addTask(text, priority, tags) {
    const task = {
      id: Date.now(),
      text: text.trim(),
      priority: priority,
      tags: tags,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.tasks.unshift(task);
    this.saveTasks();
    this.render();
  }

  // Remove uma tarefa
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.render();
  }

  // Alterna o status de conclusão
  toggleComplete(id) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.render();
    }
  }

  // Limpa tarefas concluídas
  clearCompleted() {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.saveTasks();
    this.render();
  }

  // Filtra tarefas
  getFilteredTasks() {
    let filtered = [...this.tasks];

    // Filtro por status
    if (this.currentFilter === "pendentes") {
      filtered = filtered.filter((task) => !task.completed);
    } else if (this.currentFilter === "concluidas") {
      filtered = filtered.filter((task) => task.completed);
    }

    // Filtro por prioridade
    if (this.currentPriorityFilter !== "todas") {
      filtered = filtered.filter(
        (task) => task.priority === this.currentPriorityFilter
      );
    }

    // Filtro por busca
    if (this.searchTerm) {
      filtered = filtered.filter((task) => {
        const searchLower = this.searchTerm.toLowerCase();
        const textMatch = task.text.toLowerCase().includes(searchLower);
        const tagsMatch = task.tags.some((tag) =>
          tag.toLowerCase().includes(searchLower)
        );
        return textMatch || tagsMatch;
      });
    }

    return filtered;
  }

  // Reordena tarefas após drag and drop
  reorderTasks(fromIndex, toIndex) {
    const [movedTask] = this.tasks.splice(fromIndex, 1);
    this.tasks.splice(toIndex, 0, movedTask);
    this.saveTasks();
    this.render();
  }

  // Renderiza a lista de tarefas
  render() {
    const tasksList = document.getElementById("tasksList");
    const emptyState = document.getElementById("emptyState");
    const filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      tasksList.innerHTML = "";
      emptyState.classList.add("show");
    } else {
      emptyState.classList.remove("show");
      tasksList.innerHTML = filteredTasks
        .map((task, index) => this.createTaskHTML(task, index))
        .join("");
      this.attachTaskListeners();
    }

    this.updateStats();
  }

  // Cria o HTML de uma tarefa
  createTaskHTML(task, index) {
    const priorityEmoji = {
      alta: "🔴",
      media: "🟡",
      baixa: "🟢",
    };

    const tagsHTML = task.tags
      .map((tag) => `<span class="tag">#${tag}</span>`)
      .join("");

    return `
            <div class="task-item priority-${task.priority} ${
      task.completed ? "completed" : ""
    }" 
                 data-id="${task.id}" 
                 data-index="${index}"
                 draggable="true">
                <input type="checkbox" 
                       class="task-checkbox" 
                       ${task.completed ? "checked" : ""}>
                <div class="task-content">
                    <div class="task-text">${this.escapeHTML(task.text)}</div>
                    <div class="task-meta">
                        <span class="priority-badge priority-${task.priority}">
                            ${
                              priorityEmoji[task.priority]
                            } ${task.priority.toUpperCase()}
                        </span>
                        <div class="task-tags">${tagsHTML}</div>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="delete-btn">🗑️</button>
                </div>
            </div>
        `;
  }

  // Escapa HTML para prevenir XSS
  escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Adiciona listeners aos elementos da tarefa
  attachTaskListeners() {
    // Checkboxes
    document.querySelectorAll(".task-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        const taskId = parseInt(e.target.closest(".task-item").dataset.id);
        this.toggleComplete(taskId);
      });
    });

    // Botões de deletar
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const taskId = parseInt(e.target.closest(".task-item").dataset.id);
        if (confirm("Deseja realmente excluir esta tarefa?")) {
          this.deleteTask(taskId);
        }
      });
    });

    // Drag and Drop
    document.querySelectorAll(".task-item").forEach((item) => {
      item.addEventListener("dragstart", (e) => this.handleDragStart(e));
      item.addEventListener("dragend", (e) => this.handleDragEnd(e));
      item.addEventListener("dragover", (e) => this.handleDragOver(e));
      item.addEventListener("drop", (e) => this.handleDrop(e));
      item.addEventListener("dragenter", (e) => this.handleDragEnter(e));
      item.addEventListener("dragleave", (e) => this.handleDragLeave(e));
    });
  }

  // Handlers para Drag and Drop
  handleDragStart(e) {
    this.draggedElement = e.target;
    e.target.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.innerHTML);
  }

  handleDragEnd(e) {
    e.target.classList.remove("dragging");
    document.querySelectorAll(".task-item").forEach((item) => {
      item.classList.remove("drag-over");
    });
  }

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  handleDragEnter(e) {
    if (e.target.classList.contains("task-item")) {
      e.target.classList.add("drag-over");
    }
  }

  handleDragLeave(e) {
    if (e.target.classList.contains("task-item")) {
      e.target.classList.remove("drag-over");
    }
  }

  handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (
      this.draggedElement !== e.target &&
      e.target.classList.contains("task-item")
    ) {
      const fromIndex = parseInt(this.draggedElement.dataset.index);
      const toIndex = parseInt(e.target.dataset.index);

      // Encontra os índices reais nas tarefas não filtradas
      const filteredTasks = this.getFilteredTasks();
      const fromTask = filteredTasks[fromIndex];
      const toTask = filteredTasks[toIndex];

      const realFromIndex = this.tasks.findIndex((t) => t.id === fromTask.id);
      const realToIndex = this.tasks.findIndex((t) => t.id === toTask.id);

      this.reorderTasks(realFromIndex, realToIndex);
    }

    return false;
  }

  // Atualiza as estatísticas
  updateStats() {
    const total = this.tasks.length;
    const pending = this.tasks.filter((task) => !task.completed).length;
    const completed = this.tasks.filter((task) => task.completed).length;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;
  }

  // Inicializa os event listeners
  init() {
    // Botão adicionar tarefa
    document.getElementById("addTaskBtn").addEventListener("click", () => {
      this.handleAddTask();
    });

    // Enter no input de tarefa
    document.getElementById("taskInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.handleAddTask();
      }
    });

    // Filtros de status
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        this.currentFilter = e.target.dataset.filter;
        this.render();
      });
    });

    // Filtros de prioridade
    document.querySelectorAll(".priority-filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".priority-filter-btn")
          .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        this.currentPriorityFilter = e.target.dataset.priority;
        this.render();
      });
    });

    // Busca
    document.getElementById("searchInput").addEventListener("input", (e) => {
      this.searchTerm = e.target.value;
      this.render();
    });

    // Limpar concluídas
    document
      .getElementById("clearCompletedBtn")
      .addEventListener("click", () => {
        if (confirm("Deseja realmente excluir todas as tarefas concluídas?")) {
          this.clearCompleted();
        }
      });

    // Renderização inicial
    this.render();
  }

  // Handler para adicionar tarefa
  handleAddTask() {
    const taskInput = document.getElementById("taskInput");
    const prioritySelect = document.getElementById("prioritySelect");
    const tagInput = document.getElementById("tagInput");

    const text = taskInput.value.trim();
    if (!text) {
      alert("Por favor, digite uma tarefa!");
      return;
    }

    const priority = prioritySelect.value;
    const tagsText = tagInput.value.trim();
    const tags = tagsText
      ? tagsText
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag)
      : [];

    this.addTask(text, priority, tags);

    // Limpa os campos
    taskInput.value = "";
    tagInput.value = "";
    prioritySelect.value = "media";
    taskInput.focus();
  }
}

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  const taskManager = new TaskManager();
});
