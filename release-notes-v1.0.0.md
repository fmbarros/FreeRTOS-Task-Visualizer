# FreeRTOS Task Visualizer — Versão 1.0.0 (Release)

Primeira versão oficial disponibilizada do **FreeRTOS Task Visualizer**, ferramenta pedagógica interativa para o ensino-aprendizagem de sistemas operativos em tempo real (*RTOS*) na **Universidade Politécnica de Tomar (UPTomar) / Instituto Politécnico de Tomar (IPT)**.

---

### Destaques da Versão 1.0.0

- **Simulação em Tempo Real do Kernel FreeRTOS:**
  - 4 tarefas concorrentes representativas com temporizações e prioridades ajustáveis (*TaskLED*, *TaskSerial*, *TaskSensor*, *TaskButton*);
  - Escalonador preemptivo por prioridades fixas com desempate *Round-Robin*;
  - Ciclo de ticks de sistema discreto com $1\text{ ms}$ por tick;
  - Chamadas de sistema essenciais: `vTaskDelay()`, `vTaskSuspend()`, `vTaskResume()`.
- **Instrumentação e Visualização Didática:**
  - Núcleo de processamento (*CPU Core*) dinâmico com indicação de tarefa e estados *Idle*;
  - Diagrama vetorial SVG de estados do FreeRTOS com realce interativo de transições;
  - Analisador lógico com linha temporal em tempo real (janela de 100 ms a 5 s);
  - Registo cronológico de eventos (*Event Log*) correlacionado com o diagrama de estados.
- **Autoria e Apoio Pedagógico:**
  - Identificação e logótipo oficial da Universidade Politécnica de Tomar;
  - Manual de Utilizador bilingue (Português / Inglês) integrado e em documento independente ([`USER_MANUAL.md`](USER_MANUAL.md));
  - Metadados HTML de autoria pedagógica;
  - Proteção de código e integridade de propriedade intelectual (minificação de CSS, ofuscação de JavaScript e bloqueio de cópia/inspeção).
- **Provas de Criação e Rastreabilidade:**
  - Diretório `evidence/` com hashes SHA-256 de todas as entregas, exportação PDF e captura de ecrã em alta resolução.

---

### Ficheiro Anexo
- **`FreeRTOS-Task-Visualizer-v1.0.0.zip`**: Pacote completo autónomo contendo o executável de produção (`index.html`), documentação, licença, código-fonte e comprovativos de integridade.

---

### Termos e Direitos de Autor
**Copyright © 2026 Manuel Barros — Instituto Politécnico de Tomar.**  
Todos os direitos reservados. Licença **Creative Commons CC BY-NC-ND 4.0**.
