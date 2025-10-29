## Automação de Testes E2E com Cypress e CI

Este repositório contém um projeto de automação de testes End-to-End (E2E), desenvolvido utilizando **Cypress** e totalmente integrado com a metodologia de **Integração Contínua (CI)**.

O objetivo é fornecer uma estrutura de testes escalável e com recursos avançados de relatórios e manipulação de dados.

### 💻 Tecnologias Principais

| Categoria | Tecnologia | Função no Projeto |
| :--- | :--- | :--- |
| **Framework E2E** | Cypress | Motor principal para a escrita e execução dos testes de ponta a ponta. |
| **Integração** | GitHub Actions (CI) | Configuração para execução automática dos testes em pipelines de Integração Contínua. |
| **Linguagem** | JavaScript | Linguagem de programação utilizada para a escrita dos scripts de teste. |

### ✨ Recursos e Plugins Adicionais

A estrutura foi aprimorada com diversos recursos e plugins para aumentar a eficiência e o escopo dos testes:

* **Gerenciamento de Testes em Nuvem (Cypress Cloud):** Utilização do Cypress Cloud (Dashboard) para **visualizar, gerenciar e monitorar as execuções dos testes** em tempo real no pipeline de CI.
* **Relatórios Profissionais (Mochawesome):** Geração de relatórios HTML detalhados e visuais, facilitando a análise dos resultados de cada execução.
* **Geração de Dados (Chance):** Utilização da biblioteca `chance` para criar dados de teste dinâmicos e aleatórios em massa (e-mails, nomes, etc.).
* **Suporte a XPath (`cypress-xpath`):** Adiciona a capacidade de localizar elementos usando expressões XPath, oferecendo flexibilidade em cenários de automação.
* **Testes de API (`cypress-plugin-api`):** Configuração para realizar testes de *backend* (API) dentro do mesmo *framework*.
* **Melhoria na Execução (`cypress-fail-fast`):** Interrompe a execução dos testes imediatamente após uma falha crítica, otimizando o tempo em *pipelines* de CI.
* **Qualidade de Código (ESLint):** Mantém a padronização e a qualidade dos *scripts* de teste em JavaScript.

### ⚙️ Instruções de Instalação

Para configurar e rodar o projeto localmente, siga os passos abaixo.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Adenilson-silva/automacao_cypress_ci.git](https://github.com/Adenilson-silva/automacao_cypress_ci.git)
    cd automacao_cypress_ci
    ```

2.  **Instale as dependências (Cypress e Plugins):**
    ```bash
    npm install
    ```
    *(Este comando instalará todas as dependências listadas no `package.json`.)*

3.  **Para iniciar o Cypress em modo interativo:**
    ```bash
    npx cypress open
    ```


### ⚙️ Informações Adicionais

Instalar o cypress -> npm install cypress -D

Instalar o mochawesome -> npm install mochawesome --save-dev

Instalar o chance -> npm install chance -D

Instalar o xpath -> npm install -D cypress-xpath

Instalar o fail-fast -> npm install cypress-fail-fast -D

Instalar o ESLint -> npm install eslint - D
Intalar o plugin -> npm install eslint-plugin-cypress --save-dev
Inciar o ESLint -> npm init @eslint/config (cria o arquivo de configuração)

Instalar o plugin cypress-plugin-api -> npm i cypress-plugin-api
