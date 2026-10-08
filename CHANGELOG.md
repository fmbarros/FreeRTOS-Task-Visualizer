# Changelog — Registo de Alterações

Todas as alterações relevantes efetuadas no projeto **FreeRTOS Task Visualizer** serão documentadas neste ficheiro.

O formato baseia-se em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [1.0.0] — 2026-10-08

### Adicionado
- **Simulador Interativo do Escalonador FreeRTOS:**
  - 4 tarefas concorrentes configuráveis com parâmetros dinâmicos em tempo real:
    - *TaskLED* (prioridade padrão 1, burst 2 ms, delay 80 ms);
    - *TaskSerial* (prioridade padrão 1, burst 4 ms, delay 150 ms);
    - *TaskSensor* (prioridade padrão 2, burst 3 ms, delay 200 ms);
    - *TaskButton* (prioridade padrão 3, burst 1 ms, delay 300 ms).
  - Escalonamento preemptivo baseado em prioridades fixas (1 a 5) com desempate *Round-Robin* para tarefas com a mesma prioridade.
  - Temporização virtual baseada em ticks de sistema de 1 ms (`1 tick = 1 ms`).
  - Suporte completo às chamadas de sistema FreeRTOS essenciais:
    - `vTaskDelay()` (transição para estado *BLOCKED*);
    - `vTaskSuspend()` (transição para estado *SUSPENDED*);
    - `vTaskResume()` (retoma para estado *READY*).
- **Interface Gráfica e Visualização:**
  - Painel de CPU Core em tempo real com indicador visual de ocupação e tarefa em execução.
  - Cartão do Escalonador (*Scheduler*) com lista dinâmica da fila de tarefas prontas (*Ready Queue*).
  - Diagrama vetorial interativo (SVG) de transição de estados de tarefas com explicação dinâmica por contexto.
  - Analisador Lógico / *Timeline* temporal com ajuste de escala horizontal (100 ms a 5 s).
  - Registo cronológico de eventos (*Event Log*) detalhado com filtros e correspondência visual.
- **Autoria e Apoio Pedagógico:**
  - Identificação institucional e logótipo oficial da **Universidade Politécnica de Tomar (UPTomar)**.
  - Manual de Utilizador bilingue (Português / Inglês) acessível diretamente na interface.
  - Metadados HTML estruturados de autoria pedagógica (`meta author`, `copyright`, `description`, `license`).
  - Rodapé institucional atualizado com menção aos direitos reservados.
- **Proteção e Otimização:**
  - Minificação de estilos CSS.
  - Ofuscação de código JavaScript com proteção de fluxo e codificação de cadeias.
  - Proteção contra cópia não autorizada no navegador (desativação de menu de contexto e bloqueio de atalhos de inspeção e cópia).
- **Documentação do Repositório:**
  - `README.md` abrangente com contextualização pedagógica.
  - `LICENSE.md` com menção aos Direitos de Autor e licença Creative Commons CC BY-NC-ND 4.0.
  - `CITATION.cff` para citações académicas normalizadas.
  - `USER_MANUAL.md` com manual de utilização completo e roteiro de exercícios.
  - `LEIA-ME.txt` com informação rápida em formato texto simples.
  - Diretório `evidence/` com comprovativos datados de criação e hashes criptográficos SHA-256.

---

## [Planeamento / Roteiro de Versões Futuras]

### [1.1.0] — (Next) Nova funcionalidade e novo conjunto de exercícios
- Introdução de simulação de mecanismos de sincronização IPC: Filas de mensagens (*FreeRTOS Queues*) e Semáforos binários / contadores (*vSemaphoreCreateBinary*, *xSemaphoreTake*, *xSemaphoreGive*).
- Novo módulo com exercícios pedagógicos práticos guiados para aulas laboratoriais.
- Exportação de registos de auditoria de execução para formato CSV.

### [1.1.1] — (Next) Correção sem alterar os objetivos pedagógicos
- Ajustes finos de desempenho na renderização do canvas da *Timeline* sob execuções longas.
- Otimizações de acessibilidade e contraste nos temas visuais.
- Pequenas revisões textuais nos textos explicativos sem impacto nos objetivos curriculares.

### [2.0.0] — (Next) Alteração substancial da interface, conteúdos ou avaliação
- Reestruturação global da interface gráfica com suporte a múltiplos núcleos de CPU (*SMP FreeRTOS*).
- Módulo de avaliação automática de conhecimentos e desafios interativos com correção formativa em tempo real.
- Suporte a injeção de faltas e simulação de inversão de prioridades com mecanismo de herança de prioridade (*Priority Inheritance*).
