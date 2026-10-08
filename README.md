# FreeRTOS Task Visualizer

[![Versão](https://img.shields.io/badge/versão-v1.0.0-00e5ff.svg)](CHANGELOG.md)
[![Licença: CC BY-NC-ND 4.0](https://img.shields.io/badge/Licen%C3%A7a-CC%20BY--NC--ND%204.0-lightgrey.svg)](LICENSE.md)
[![Instituição](https://img.shields.io/badge/Institui%C3%A7%C3%A3o-UPTomar%20%2F%20IPT-ffab00.svg)](https://www.ipt.pt)
[![Unidade Curricular](https://img.shields.io/badge/UC-Sistemas%20Distribu%C3%ADdos%20de%20Controlo-00e676.svg)](USER_MANUAL.md)
[![GitHub Release](https://img.shields.io/badge/Release-v1.0.0-blue.svg)](https://github.com/fmbarros/FreeRTOS-Task-Visualizer/releases)

<div align="center">
  <img src="assets/logo-uptomar.png" alt="Universidade Politécnica de Tomar" width="360" />
  <p><strong>Recurso Didático de Engenharia Informática e Engenharia Eletrotécnica</strong></p>
</div>

---

## 1. Identificação do Recurso

* **Nome do Recurso:** FreeRTOS Task Visualizer
* **Autor:** Prof. Manuel Barros
* **Instituição:** Universidade Politécnica de Tomar (UPTomar) / Instituto Politécnico de Tomar (IPT)
* **Unidade Curricular:** Sistemas Distribuídos de Controlo (SDC)
* **Áreas Científicas:** Engenharia Informática · Engenharia Eletrotécnica · Sistemas Embebidos e Tempo Real
* **Estado:** Produção Pedagógica Ativa (Disponibilizado para o ano letivo 2026/2027)
* **Versão Atual:** `v1.0.0`
* **Data de Publicação:** 8 de Outubro de 2026
* **Repositório Oficial:** [https://github.com/fmbarros/FreeRTOS-Task-Visualizer](https://github.com/fmbarros/FreeRTOS-Task-Visualizer)

---

## 2. Objetivo Pedagógico

O **FreeRTOS Task Visualizer** é uma ferramenta computacional interativa projetada para desmistificar o comportamento em tempo real do núcleo (*kernel*) do FreeRTOS num processador mononúcleo (*Single-Core*).

Os estudantes conseguem explorar experimentalmente:
- A mecânica do **escalonador preemptivo por prioridades fixas**;
- O ciclo de vida e a **máquina de transição de estados de tarefas** (*Running*, *Ready*, *Blocked*, *Suspended*);
- O impacto temporal do temporizador de sistema (*System Ticks*, com resolução virtual de $1\text{ ms}$);
- O comportamento determinístico de chamadas de API essenciais como `vTaskDelay()`, `vTaskSuspend()` e `vTaskResume()`;
- A ocorrência e mitigação de anomalias temporais como a **inanição de tarefas** (*Task Starvation*);
- A cronologia detalhada através de um **analisador lógico virtual** incorporado.

---

## 3. Estado e Versões

### Versão Atual: `v1.0.0` (8 de Outubro de 2026)
Primeira versão oficial disponibilizada, integrando:
- Simulação de 4 tarefas concorrentes com parametrização em tempo real;
- Núcleo de CPU com exibição da tarefa ativa e estados ociosos (*Idle*);
- Diagrama vetorial SVG de estados interativo com realce dinâmico de transições;
- Analisador lógico com janela de amostragem configurável de 100 ms a 5 s;
- Registo cronológico de eventos com auditoria de decisões de escalonamento;
- Manual de utilizador bilingue (Português / Inglês) em janela modal;
- Mecanismos de integridade e ofuscação com proteção contra cópia no navegador;
- Comprovativos datados de criação e integridade criptográfica SHA-256 no diretório `evidence/`.

### Roteiro de Versões Futuras (Roadmap)
* **`v1.1.0` (Next):** Nova funcionalidade de comunicação entre tarefas (Filas de Mensagens e Semáforos do FreeRTOS) e novo conjunto de exercícios práticos guiados para sessões de laboratório.
* **`v1.1.1` (Next):** Otimizações e correções de renderização gráfica sem alteração dos objetivos pedagógicos fundamentais.
* **`v2.0.0` (Next):** Alteração substancial da arquitetura visual, suporte a sistemas com múltiplos núcleos (*FreeRTOS SMP*) e módulo de desafios interativos com avaliação formativa automática.

---

## 4. Estrutura do Repositório

```text
FreeRTOS-Task-Visualizer/
├── README.md               # Identificação, objetivos, estado, versão e condições
├── LICENSE.md              # Direitos de autor e termos CC BY-NC-ND 4.0
├── CITATION.cff            # Ficheiro de citação académica normalizada
├── CHANGELOG.md            # Histórico detalhado de alterações por versão
├── LEIA-ME.txt             # Resumo rápido em texto simples
├── USER_MANUAL.md          # Manual de utilização completo e guiões práticos
├── .gitignore              # Filtros de exclusão de ficheiros temporários
│
├── index.html              # Aplicação de produção pronta a executar (ofuscada/minificada)
├── freertos-task-visualizer.html # Ficheiro pedagógico com metadados e marca de água
│
├── src/                    # Ficheiros-fonte integrais e rascunhos datados
│   └── freertos-task-visualizer.html
├── dist/                   # Ficheiros distribuíveis minificados e ofuscados
│   └── freertos-task-visualizer.min.html
├── assets/                 # Recursos gráficos e logótipo institucional da UPTomar
│   └── logo-uptomar.png
├── scripts/                # Scripts de compilação, minificação e ofuscação
│   └── build.js
└── evidence/               # Provas de criação, exportações, metadados e hashes SHA-256
    ├── PROVA-DE-CRIACAO.md
    └── checksums-v1.0.0.sha256
```

---

## 5. Como Executar

O projeto foi construído para funcionar de forma **100% autónoma**, sem necessidade de instalação de dependências, servidores Web ou configurações complexas:

1. **Execução Direta no Navegador:**
   - Faça duplo clique no ficheiro [`index.html`](index.html) ou abra-o em qualquer navegador moderno (Chrome, Firefox, Safari, Edge).
2. **Execução Local com Servidor Leve (Opcional):**
   ```bash
   npx serve .
   # ou
   python3 -m http.server 8000
   ```
   Aceda a `http://localhost:8000`.

---

## 6. Proteção de Autoria e Código

Para assegurar a integridade do recurso de ensino e preservar a autoria pedagógica:
- **Ofuscação de JavaScript:** O código executável da distribuição é ofuscado com técnicas de transformação de fluxo de controlo e proteção de literais;
- **Minificação de CSS/HTML:** Os estilos foram comprimidos para maximizar o desempenho de renderização;
- **Dificultação de Cópia no Navegador:** Foram implementadas regras que desativam o menu de contexto do rato (botão direito) e bloqueiam os atalhos típicos de inspeção de código (`F12`, `Ctrl+U`, `Ctrl+Shift+I`, `Cmd+Alt+I`, etc.) e cópia arbitrária.

---

## 7. Direitos de Autor e Condições de Uso

**Copyright © 2026 Manuel Barros, Instituto Politécnico de Tomar / Universidade Politécnica de Tomar.**  
Todos os direitos reservados.

```text
2026 Manuel Barros — Instituto Politécnico de Tomar.
Todos os direitos reservados. Não é permitida a redistribuição
ou adaptação sem autorização.
```

Este recurso didático é disponibilizado sob a licença **Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional (CC BY-NC-ND 4.0)**.
- **Permitido:** Consulta, execução e utilização estritamente pedagógica pelos estudantes matriculados nas unidades curriculares indicadas.
- **Proibido:** Reprodução, redistribuição pública, espelhamento, modificação, engenharia reversa ou qualquer utilização de índole comercial sem autorização expressa e por escrito do autor.

Consulte o documento completo em [`LICENSE.md`](LICENSE.md).

---

## 8. Como Citar

Se utilizar este simulador em artigos científicos, relatórios técnicos, dissertações ou trabalhos académicos, consulte o ficheiro [`CITATION.cff`](CITATION.cff) ou utilize a referência:

> Barros, Manuel (2026). *FreeRTOS Task Visualizer: Ferramenta Didática Interativa de Escalonamento em Tempo Real* (Versão 1.0.0). Universidade Politécnica de Tomar. DOI/URL: https://github.com/fmbarros/FreeRTOS-Task-Visualizer

---

## 9. Contactos Institucionais

* **Docente Responsável:** Prof. Manuel Barros
* **E-mail Institucional:** [fmbarros@univpt.pt](mailto:fmbarros@univpt.pt)
* **Instituição:** Universidade Politécnica de Tomar (UPTomar) / Instituto Politécnico de Tomar (IPT)
* **Localização:** Estrada da Serra, Quinta do Contador, 2300-313 Tomar, Portugal
