# Manual de Utilização — FreeRTOS Task Visualizer (v1.0.0)

**Autor:** Prof. Manuel Barros ([fmbarros@univpt.pt](mailto:fmbarros@univpt.pt))  
**Instituição:** Universidade Politécnica de Tomar (UPTomar) / Instituto Politécnico de Tomar (IPT)  
**Unidade Curricular:** Sistemas Distribuídos de Controlo (SDC)  
**Cursos:** Engenharia Informática · Engenharia Eletrotécnica  
**Licença:** Creative Commons CC BY-NC-ND 4.0 (Todos os direitos reservados)

---

## 1. Introdução e Enquadramento Didático

O **FreeRTOS Task Visualizer** é uma ferramenta didática interativa desenvolvida para apoiar os estudantes na compreensão intuitiva do funcionamento interno do escalonador de um sistema operativo de tempo real (*Real-Time Operating System* — RTOS).

Num microcontrolador com um único núcleo de processamento (CPU *Single-Core*), o FreeRTOS cria a ilusão de execução concorrente através da multiplexagem rápida no tempo entre tarefas. A decisão sobre qual tarefa tem acesso ao CPU em cada instante depende estritamente das suas **prioridades** e dos seus **estados operacionais**.

O simulador adota uma base de tempo virtual discreta:
$$\text{1 tick de sistema} = \text{1 milissegundo (ms)}$$

---

## 2. Visão Geral da Interface Gráfica

A interface está dividida em cinco áreas funcionais essenciais:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Barra Superior: Logótipo · Controlos (Play, Step, Reset, Manual, Velocidade) │
├───────────────────┬───────────────────────────────────┬─────────────────────┤
│                   │ Núcleo CPU (Chip) & Ticks         │                     │
│ Painel de Tarefas │ Cartão do Escalonador (Scheduler) │ Registo de Eventos  │
│  (Configuração de │ Diagrama de Estados (SVG)         │     (Event Log)     │
│   Priority/Delay) │                                   │                     │
├───────────────────┴───────────────────────────────────┴─────────────────────┤
│ Analisador Lógico / Linha Temporal (Timeline em tempo real)                 │
├─────────────────────────────────────────────────────────────────────────────┤
│ Rodapé Institucional: Direitos de Autor · UPTomar · SDC                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.1. Barra de Controlo Superior
- **▶ Play / ⏸ Pause:** Inicia ou suspende a marcha contínua da simulação virtual.
- **⏭ Tick:** Avança a simulação exatamente **1 milissegundo (1 tick)**. Permite dissecar cada decisão do escalonador ao detalhe.
- **↺ Reset:** Reinicializa os contadores temporais, o histórico do analisador lógico e os estados das tarefas.
- **❓ Manual:** Abre a janela de ajuda pedagógica interativa bilingue (Português e Inglês).
- **Speed Slider (1× a 20×):** Controla o ritmo da simulação em milissegundos reais por tick virtual.

### 2.2. Painel Lateral de Tarefas (Esquerda)
O simulador inclui 4 tarefas padrão representativas de sistemas embebidos típicos:
1. **TaskLED (P1):** Piscar de LED periódico (baixo consumo de CPU).
2. **TaskSerial (P1):** Processamento de comunicação série assíncrona.
3. **TaskSensor (P2):** Amostragem de grandezas físicas de sensores.
4. **TaskButton (P3):** Deteção de eventos assíncronos e botões de comando.

Cada tarefa possui os seguintes controlos configuráveis em tempo real:
- **Priority (1 a 5):** Nível de prioridade estática da tarefa (5 = máxima prioridade; 1 = mínima prioridade).
- **Delay (ms):** Duração do intervalo em que a tarefa permanece no estado **BLOCKED** após cada execução, invocando `vTaskDelay()`.
- **Run (ms):** Tempo de cálculo contínuo necessário pelo CPU em cada ciclo da tarefa.
- **Interruptor On/Off:** Suspende (`vTaskSuspend()`) ou retoma (`vTaskResume()`) a tarefa.

### 2.3. Painel Central do CPU e Escalonador
- **Logótipo Institucional UPTomar:** Identificação pedagógica e garantia de proveniência do recurso.
- **CPU Core (Chip):** Apresenta o estado do núcleo no instante atual:
  - Identificação da tarefa atualmente em processamento;
  - Estado `Idle` quando todas as tarefas ativas estão temporariamente bloqueadas;
  - Iluminação dinâmica com a cor representativa da tarefa.
- **Contador de Ticks e Tempo Virtual:** Monitor do tempo decorrido desde o arranque.
- **Scheduler Card (Escalonador):**
  - Explicação textual imediata da justificação da decisão de escalonamento;
  - Lista de tarefas na fila de espera de prontidão (*Ready Queue*).
- **Diagrama de Transição de Estados (State Diagram):**
  - Visualização gráfica das 4 transições canónicas do FreeRTOS:
    - `Ready → Running`
    - `Running → Blocked`
    - `Blocked → Ready`
    - `Running / Ready → Suspended`
  - Contadores de ocorrências em cada transição;
  - Possibilidade de clicar numa tarefa na legenda para filtrar apenas as suas transições.

### 2.4. Registo de Eventos (Event Log — Direita)
- Lista cronológica detalhada de cada evento, chamada a funções de sistema e transições de estado.
- Ao passar o cursor (*hover*) sobre uma linha do registo, a transição correspondente é realçada graficamente no diagrama de estados.

### 2.5. Analisador Lógico / Linha Temporal (Timeline — Fundo)
- Representação gráfica inspirada em analisadores lógicos de bancada de laboratório.
- Apresenta as 4 tarefas e a linha de CPU ao longo do tempo.
- Cores identificadoras:
  - 🟢 **Verde:** *RUNNING* (tarefa detém a posse do CPU);
  - 🟡 **Âmbar:** *READY* (tarefa apta a executar mas à espera de CPU);
  - 🔵 **Azul:** *BLOCKED* (tarefa à espera da expiração do temporizador `vTaskDelay()`);
  - ⚪ **Cinzento:** *SUSPENDED* (tarefa desligada via `vTaskSuspend()`).
- Seletor de Janela Temporal (*Window*): Permite escolher o alcance horizontal entre 100 ms, 250 ms, 500 ms, 1 s, 2 s e 5 s.

---

## 3. Regras de Escalonamento do FreeRTOS

O comportamento reproduzido segue com fidelidade a especificação do kernel FreeRTOS:
1. **Preempção por Prioridade:** O escalonador atribui sempre o processador à tarefa no estado *READY* com o nível numérico de prioridade mais elevado.
2. **Preempção Imediata:** Se uma tarefa de maior prioridade transitar para o estado *READY* (por exemplo, por expiração de um atraso), a tarefa de menor prioridade em execução é imediatamente interrompida e recolocada na fila de *READY*, conservando o tempo de processamento restante para o seu próximo ciclo.
3. **Desempate Round-Robin:** Quando duas ou mais tarefas *READY* possuem rigorosamente a mesma prioridade, a execução é alternada segundo uma política circular (*Round-Robin*), recebendo o CPU a tarefa que aguarda há mais tempo.
4. **Carga Nula em Bloqueio:** Enquanto uma tarefa está no estado *BLOCKED*, consome zero ciclos de processamento útil do CPU.

---

## 4. Guia de Trabalhos Práticos e Laboratoriais

Os seguintes guiões de exercícios são recomendados para sessões práticas na unidade curricular de **Sistemas Distribuídos de Controlo (SDC)**:

### Exercício 1: Observação do Mecanismo de Preempção
1. Certifique-se de que a simulação está pausada e carregue em **↺ Reset**.
2. Defina a **TaskSerial** com prioridade `1` e tempo de execução (*Run*) de `15 ms`.
3. Defina a **TaskButton** com prioridade `3` e tempo de execução (*Run*) de `2 ms`, com atraso (*Delay*) de `20 ms`.
4. Avance a simulação passo a passo utilizando **⏭ Tick**.
5. **Observação esperada:** No instante em que o atraso da TaskButton termina, a TaskSerial é interrompida a meio do seu cálculo e colocada em estado *READY*. O analisador lógico ilustra a alternância na linha temporal.

### Exercício 2: O Fenómeno de Inanição (*Starvation*)
1. Configure a **TaskSensor** com prioridade `4` e tempo de atraso (*Delay*) igual a `0 ms` (ou valor inferior ao seu tempo de processamento).
2. Observe o comportamento das tarefas de prioridade inferior (TaskLED e TaskSerial).
3. **Conclusão pedagógica:** Uma tarefa de alta prioridade que não liberte voluntariamente o CPU através de primitivas bloqueantes (`vTaskDelay`, semáforos ou filas) monopoliza o processador, impedindo as tarefas de prioridade inferior de alguma vez executarem.

### Exercício 3: Escalonamento Circular (*Round-Robin*)
1. Altere as prioridades da **TaskLED** e da **TaskSerial** para o mesmo valor (por exemplo, prioridade `2`).
2. Defina tempos de processamento semelhantes.
3. Inicie a simulação e examine a alternância no gráfico do analisador lógico.

---

## 5. Medidas de Integridade e Proteção de Propriedade Intelectual

Para salvaguardar os direitos de autor pedagógicos do docente e da instituição de ensino (**Universidade Politécnica de Tomar**):
- O código de distribuição é ofuscado e minificado para preservar a integridade do modelo computacional;
- Encontra-se desativado o menu de contexto do rato (botão direito) e bloqueadas as teclas de atalho de inspeção de código e cópia indiscriminada no navegador;
- Os estudantes devem consultar este recurso exclusivamente através dos canais letivos autorizados.

---

## 6. Informações e Contactos

Para apoio técnico, sugestões de novos cenários didáticos ou questões sobre a unidade curricular:

* **Docente Responsável:** Prof. Manuel Barros
* **E-mail:** [fmbarros@univpt.pt](mailto:fmbarros@univpt.pt)
* **Instituição:** Instituto Politécnico de Tomar / Universidade Politécnica de Tomar
* **Gabinete:** Departamento de Engenharia Eletrotécnica e Informática
