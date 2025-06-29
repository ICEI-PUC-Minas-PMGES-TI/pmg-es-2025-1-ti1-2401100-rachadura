# Introdução

## Informações básicas do projeto.

* **Projeto:** Radar Urbano
* **Repositório GitHub:** Rachadura
* **Membros da equipe:**
  * [Vinícius dos Santos Gonçalves](https://github.com/MomoSkywalker) 
  * [Lucas do Carmo Braz](https://github.com/llucasBraz) 
  * [Pedro Augusto Carvalho de Oliveira](https://github.com/Pedro-C4RVALHO)
  * [Arthur Souza Fernandes](https://github.com/arthurxds)
  * [Gabriel Costa Silva](https://github.com/GabrielCosta1311)
  * [Victor Roberto Chagas Alves](https://github.com/vitinho17alves)
  * [Stêvão Guadanini Diniz](https://github.com/Stevao-xd)
  * [Lucas Maia Marques Pinheiro](https://github.com/lvcasxm)

A documentação do projeto é estruturada da seguinte forma:

1. Introdução
2. Contexto
3. Product Discovery
4. Product Design
5. Metodologia
6. Solução
7. Referências Bibliográficas

✅ [Documentação de Design Thinking (MIRO)](files/processo-dt.pdf)

# Contexto

A Região Metropolitana de Belo Horizonte, bem como muitas outras áreas urbanas do Brasil, sofre muito com problemas de infraestrutura urbana, graças ao crescimento desordenado e ao descaso do poder público, que não dá a devida atenção e não se prontifica a solucionar esses problemas que tanto aflingem a população. É comum vermos buracos nas calçadas e nas estradas, praças mal cuidadas, iluminação precária nas ruas, falta de eletricidade, problemas no transporte público e assim por diante, e, infelizmente, nos acostumamos a relevar tais problemas, de forma que não denunciamos, e, mesmo se eventualmente quisermos, nem ao menos sabemos como fazer isso de forma prática.

Sendo assim, o projeto propõe a criação de um software simples e intuitivo que permita os moradores dessas regiões fazerem denúncias de infraestrutura, de modo que seja fácil o anexo de fotos, vídeos, comentários, e de forma que essas denúncias efetivamente cheguem às autoridades competentes.

## Problema

Nosso grupo identificou que não havia um mecanismo fácil e acessível de comunicar problemas de infraestrutura urbana diretamente às autoridades competentes, o que dificulta a vida dos cidadãos que enfrentam tais problemas, uma vez que muitas vezes eles nem sequer sabem como fazer isso. Sendo assim, reduzimos nosso escopo para os moradores da zona Metropolitana da Grande Belo Horizonte, e focamos nos problemas relacionados às vias públicas e da infraestrutura urbana, o que inclui todo o ecossistema urbano que vemos e usamos diariamente, como calçadas, parques, praças, ônibus e assim por diante. Mas, além disso, também é possível denunciar problemas na rede elétrica, na captação fluvial e outros.

A decisão de focar na Região Metropolitana surgiu da constatação de que muitas dessas cidades foram sendo construídas de maneira desordenada, sem que houvesse um planejamento urbano que acompanhasse seu crescimento populacional, o que gera uma gama de problemas que, ao longo do tempo, se acumulam e se tornam cada vez mais difíceis de serem resolvidos, principalmente porque o poder público nada ou pouco faz para resolvê-los. Existem muito poucos projetos de revitalização em andamento, sem contar a falta de loteamento, arborização, asfaltamento e assim por diante. 

Portanto, buscamos criar um canal que dê ao cidadão um maior sentimento de integração com a cidade e com as demais pessoas, e que também o permita exercer sua vox populi, porque, ao reconhecer a existência de um problema, e denunciá-lo, não é somente a pessoa que se beneficia, porque muitas outras também utilizam do mesmo espaço, e com certeza sofrem pelos mesmos motivos.

## Objetivos

### Objetivos Gerais

O objetivo geral deste projeto é desenvolver um software que permita os moradores da Região Metropolitana denunciar problemas de infraestrutura urbana, como falhas em vias públicas, calçadas, praças, transporte coletivo, entre outros. O software deverá ser acessível, de modo que facilite o processo de denúncia e seja intuitivo na identificação do fluxo que o usuário deve percorrer, para anexar fotos e/ou vídeos, incluir uma descrição do problema e identificar sua localização e assim por diante. Com isso, busca-se promover uma maior integração entre cidadão e cidade, incentivando a participação popular nas decisões públicas e contribuindo para a melhoria do bem-estar coletivo no uso dos espaços urbanos.

### Objetivos Específicos

- **1) Mapear todos as denúncias feitas num determinado local.**  
Fazer com que o usuário acesse o histórico de denúncias feitas naquela região, para que seja possível identificar quais são as áreas ou quais são os problemas mais recorrentes de lá.

- **2) Criar uma interface de usuário fácil e intuitiva.**  
Tornar fácil a utilização do software, para que o cidadão não enfrente dificuldades em reconhecer um problema e rapidamente denunciá-lo, de modo que a interface seja bem clara e objetiva.

- **3) implementar um algortimo de tags que separa as denúncias.**  
Na hora de enviar o problema, o usuário deve adicionar uma tag ou alguma forma de identificação referente ao que ele está denunciando, para que facilite na organização e vizualização do histórico daquela região.

- **4) Enganjamento entre os usuários.**  
Criar uma forma de dar "like" ou "dislike" nas denúncias, bem como criar também uma seção de comentários, evitando com que denúncias repetidas sejam feitas referentes ao mesmo problema, e identificando àquelas que precisam de mais urgência para serem resolvidas.

- **5) Integração do software com APIs de localização.**  
Permitir o reconhecimento e a vizualicação das dénuncias em tempo real.

## Justificativa

A deterioração da infraestrutura urbana nas cidades brasileiras não é um problema novo, mas sua persistência revela uma falha crônica no diálogo entre população e poder público. Moradores convivem diariamente com:

- Calçadas esburacadas
- Bueiros entupidos
- Praças abandonadas
- Iluminação pública deficiente

Problemas que, embora pareçam pequenos isoladamente, somados comprometem significativamente a qualidade de vida urbana.

### O cerne da questão

Está na ausência de canais eficazes que:

1. Documentem sistematicamente esses problemas cotidianos
2. Dêem visibilidade às demandas recorrentes da população
3. Criem um histórico público que evidencie padrões de negligência

### Situação atual

Quando um cidadão tenta reportar um buraco na rua ou a falta de iluminação:

- As reclamações se perdem em canais burocráticos e fragmentados
- Não há transparência sobre o andamento das solicitações
- Falta um registro organizado que mostre problemas crônicos em determinadas áreas

### Fundamentação do projeto

Nosso projeto nasce da constatação de que:

> "Problemas documentados têm 3x mais chances de solução" (IPEA, 2023)

Dados relevantes:

- Comunidades organizadas conseguem melhores respostas do poder público (FGV, 2022)
- A falta de um histórico dificulta a cobrança por melhorias (PBH, 2023)

#### Diferencial

Não se trata apenas de criar mais um aplicativo, mas de estabelecer:

- Uma memória coletiva dos problemas urbanos
- Uma ferramenta que transforme o descontentamento esporádico em:
  - Dados organizados
  - Ações coordenadas

**Exemplo:** Quando uma comunidade pode mostrar, com registros acumulados ao longo de meses, que determinado cruzamento segue perigoso por falta de iluminação, sua voz ganha peso político considerável.

### Impacto Esperado

Ao organizar a demanda social, buscamos:
- Reduzir a assimetria de informação entre população e governo
- Criar accountability para a gestão urbana
- Empoderar os cidadãos como agentes ativos da mudança

> ### Referências
> 
> - "Participação Social e Gestão Urbana" (IPEA, 2023)
> - "Eficácia de Ferramentas Cívicas" (FGV, 2022)
> - "Relatório de Demandas Urbanas" (PBH, 2023)

## Público-Alvo

O público-alvo do nosso software é todos os moradores da Região Metropolitana de Belo Horizonte, que enfrentam ou que já enfrentaram problemas de infraestrutura, e que desconhecem meios de denunciar tais problemas. Pelo fato do tópico ser bem abrangente, e sabendo que praticamente todas as pessoas já enfrentaram problemas como esses, podemos abranger tanto alguém que utiliza o transporte público, quanto alguém que costuma frequentar parques e pracinhas, quanto alguém que trabalha como Uber, quanto alguém que mora em uma região com problemas de eletricidade e assim por diante. No quesito acessibilidade, o foco são pessoas que possuam um celular com acesso à internet, mas que não necessariamente possuam muito conhecimento tecnológico, porque buscamos tornar a interface de usuário simples e dinâmica, para que seja fácil e rápido fazer uma denúncia.

# Product Discovery

## Etapa de Entendimento

**✳️✳️✳️ APRESENTE OS ARTEFATOS DA ETAPA  ✳️✳️✳️**

### **Matriz de Alinhamento CSD & Mapa de Stakeholders:**

<img src="https://github.com/user-attachments/assets/215c3b2c-cd48-4c7c-9ff4-f8fa9ccd103f" alt="MCSD" width="317"/>

### **Entrevistas Qualitativas & Highlights de Pesquisa:**
* 1ª Entrevista:

 <img src="https://github.com/user-attachments/assets/d82ac5ea-ff2d-4988-b421-45909dc73f1d" alt="Entrevista 1" width="317"/>
 

* 2ª Entrevista:

 <img src="https://github.com/user-attachments/assets/9de4860e-ba2b-47f3-b5bb-8eb2da3f7869" alt="Entrevista 2" width="317"/>
 

* 3ª Entrevista:

 <img src="https://github.com/user-attachments/assets/90b1c7bc-267b-4dc4-b529-2940c2a35166" alt="Entrevista 3" width="317"/>
 

* 4ª Entrevista:

 <img src="https://github.com/user-attachments/assets/28e2730f-dfe8-4a69-a19d-596c83f1e32f" alt="Entrevista 4" width="317"/>
 

* 5ª Entrevista:

 <img src="https://github.com/user-attachments/assets/a2e42341-657c-4c74-8aae-ff9b892e71ad" alt="Entrevista 5" width="317"/>
 

* 6ª Entrevista:

 <img src="https://github.com/user-attachments/assets/5d280683-56e3-4f3a-9ea4-634cf31ceae3" alt="Entrevista 6" width="317"/>

## Etapa de Definição

### Personas

**✳️✳️✳️ APRESENTE OS DIAGRAMAS DE PERSONAS ✳️✳️✳️**

* **David Hatsunaga:**

<img src="https://github.com/user-attachments/assets/5321a3ab-170b-4a9a-bfc1-a7c2b16a2ca4" alt="Persona 1" width="350"/>

* **Ana Costa:**

<img src="https://github.com/user-attachments/assets/692b2b92-8b9e-436a-af9a-fb02d2362e5b" alt="Persona 2" width="350"/>

* **Pedro Silva:**

<img src="https://github.com/user-attachments/assets/e319687a-a3ab-45d5-a133-8ee2dec501e4" alt="Persona 3" width="350"/>

* **Lucas Almeida:**

<img src="https://github.com/user-attachments/assets/edf6aadb-de43-47f3-89e1-ec2a73e7e118" alt="Persona 4" width="350"/>

# Product Design

Nesse momento, vamos transformar os insights e validações obtidos em soluções tangíveis e utilizáveis. Essa fase envolve a definição de uma proposta de valor, detalhando a prioridade de cada ideia e a consequente criação de wireframes, mockups e protótipos de alta fidelidade, que detalham a interface e a experiência do usuário.

## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

| **Eu como...**                     | **Preciso de..**                                          | **Para**                                                 |
|---------------------------------|----------------------------------------------------------|-------------------------------------------------------------|
| Motorista de Uber               | Site que indique problemas na estrada ou via pública      | Ter rota mais segura e rápida                               |
| Cidadão preocupado com segurança| Reportar postes de luz apagados ou com defeito           | Garantir ruas bem iluminadas à noite                        |
| Trabalhador que usa carro       | Informações sobre vias interditadas                      | Evitar atrasos no trabalho                                  |
| Entregador de delivery          | Site com informações de vias seguras e rápidas           | Ter rotas seguras durante entregas                          |
| Motorista de ambulância         | Dados sobre vias interditadas, alagadas ou desmoronamento| Deslocamento rápido e seguro com ou sem paciente            |
| Ciclista                       | Informações sobre ciclovias e segurança nas mesmas       | Prevenir acidentes e garantir segurança                     |
| Caminhoneiro                   | Mais áreas de escape no anel rodoviário                  | Melhorar segurança no trânsito                              |
| Pedestre                       | Calçadas seguras e presentes em todas as vias            | Garantir segurança ao caminhar 

## Proposta de Valor

##### Proposta para Persona 1 (Engenheiro Mecânico)

![image](https://github.com/user-attachments/assets/80338446-8a33-4566-8f69-69f3c892031a)

##### Proposta para Persona 2 (Motorista de Uber em tempo integral)

![image](https://github.com/user-attachments/assets/4f51aa90-fafe-4e4c-acc9-6c4a7e980993)

##### Proposta para Persona 3(Designer gráfico freelancer e ciclista ativo)

![image](https://github.com/user-attachments/assets/b8097a64-3503-4277-9e23-5a86e9ce68be)

##### Proposta para Persona 3(Estudante universitário e cidadão ativo)

![image](https://github.com/user-attachments/assets/2a1d3aa0-d4b6-496c-a0c7-8c3ec91c2448)


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

| ID     | Descrição do Requisito                                   | Prioridade |
| ------ | ---------------------------------------------------------- | ---------- |
| RF-001 | O sistema deve permitir que o usuário avalie e comente uma denúncia  | Alta       |
| RF-002 | O sistema deve permitir interação do usuário com o Mapa | Alta     |
| RF-003 | O sistema deve permitir que a denúncia seja compartilhada via link | Média     |
| RF-004 | O sistema deve permitir que a denúncia seja categorizada | Média     |
| RF-005 | O sistema deve permitir que uma dica pertinente de como agir em uma situação de perigo seja mostrada de acordo com a categoria do problema | Média     |
| RF-006 | O sistema deve permitir que o usuário faça upload de fotos e vídeos do problema que está denunciando | Alta     |
| RF-007 | O sistema deve permitir que o usuário faça uma descrição daquilo que está denunciando | Alta     |
| RF-008 | O sistema deve ter uma página de Login, uma de Registro e uma de Cadastro | Baixo     |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                              | Prioridade |
| ------- | ------------------------------------------------------------------------------------- | ---------- |
| RNF-001 | O sistema deve ter modo Claro e Escuro (que também se extende ao mapa) | Média     |
| RNF-002 | O sistema deve ter design responsivo para garantir boa usabilidade em diferentes dispositivos (PC, tablet, celular)          | Alta      |
| RNF-003 | O sistema deve ter uma notificação de status da denúncia (se o problema ainda está em aberto ou se foi concluído)          | Baixa      |
| RNF-004 | O sistema deve ter escalabilidade de quantidade de usuário          | Baixa      |
| RNF-005 | O sistema deve ter fonte adequada, esteticamente agradável, de fácil leitura e com padronização de cor.          | Média      |
| RNF-006 | O sistema deve ter interface intuitiva e acessível, mesmo para usuários com pouca experiência digital.          | Alta      |
| RNF-007 | O sistema deve ter formulários fáceis de preencher, minimizando campos obrigatórios.          | Baixa      |
| RNF-008 | O sistema deve ter feedback visual e mensagens claras após cada ação do usuário (ex.: denúncia enviada com sucesso).          | Alta      |
| RNF-009 | O sistema deve funcionar durante o dia inteiro          | Alta      |
| RNF-010 | O sistema deve ser feito por meio das linguagens de HTML, CSS e JavaScript          | Alta      |
| RNF-011 |O sistema deve ser publicado em ambiente acessível via internet  | Alta      |

## Projeto de Interface

Artefatos relacionados com a interface e a interacão do usuário na proposta de solução.

### Wireframes

Estes são os protótipos de telas do sistema.

##### Telas para Dispositivos Moveis . 

Estas imagens representam esboços iniciais da nossa proposta de interface.
Elas foram desenvolvidas com o objetivo de ilustrar visualmente as funcionalidades e o fluxo de navegação do sistema, servindo como base para futuras etapas de design e desenvolvimento. 

![tela1a4](images/tela1a4.png)
![login](images/login.png)


### User Flow

![fluxodetelas](images/fluxodetelas.png)


# Metodologia
Organização
O grupo se reunia aos finais de semana, visto que muitos trabalhavam em tempo integral durante a semana, via Discord para uma chamada de voz onde eram estipuladas, em conjunto e de acordo com a agenda de cada integrante, as tarefas que cada um executaria, estipulando um prazo para que tudo fosse entregue e integrado de maneira organizada.

Durante as fases iniciais do projeto, o Miro foi utilizado como a principal ferramenta para a execução das tarefas estipuladas pelos professores durante a semana.

Nas fases posteriores, houve um maior esforço para que, em complemento ao servidor criado no Discord (onde eram armazenadas as principais informações - como link do Miro, das atividades do Canvas e do repositório criado no GitHub), também fosse feito uso da aba "Projects" na própria plataforma do GitHub, onde poderíamos estipular com mais critério e de forma mais clara a quem cada atividade caberia - além de tornar mais fácil a interação entre os integrantes para mostrar quais atividades foram concluídas ou ainda estavam em execução.

Para a realização dos wireframes, fizemos uso do próprio Miro, que fornece alguns templates que facilitam o processo de criação de croquis das principais páginas do site e o fluxo pelo qual o usuário teria que passar para realizar qualquer tarefa presente na aplicação.

Focamos em manter o layout do site em "Mobile-First" (Dispositivos Móveis em Primeiro Lugar), visto que o objetivo do projeto é torná-lo o mais simples possível para uso diário, tanto para pessoas que sejam novas na plataforma e queiram ter uma experiência mais "User Friendly" (Amigável ao Usuário), quanto para pessoas que têm dificuldades com o manuseio de aparelhos telefônicos e aplicações mais modernas - que são geralmente as pessoas que mais enfrentam problemas de infraestrutura, mas que possuem pouquíssimas plataformas ou incentivos para denunciar aquilo que as aflige.

## Ferramentas

Relação de ferramentas empregadas pelo grupo durante o projeto.

| Ambiente                    | Plataforma | Link de acesso                                     |
| --------------------------- | ---------- | -------------------------------------------------- |
| Processo de Design Thinking | Miro       | https://miro.com/app/board/uXjVIaSTdWs=/?share_link_id=242424685997        |
| Repositório de código       | GitHub     | https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2025-1-ti1-2401100-rachadura.git      |
| Wire Frame                  | Miro       | https://miro.com/app/board/uXjVIG0RF0w=/ |
| Protótipo Interativo        | Figma  |  https://www.figma.com  |
| Apresentação de Slides      | Canvas     | https://shorturl.at/qYviM |
| Lista de Requisitos &  História de Usuários | MarkDown Table Editor | https://www.tablesgenerator.com/markdown_tables |
| README.md Edição de Texto | StackEdit | https://stackedit.io/ |

## Gerenciamento do Projeto

Divisão de papéis no grupo e apresentação da estrutura da ferramenta de controle de tarefas (Kanban).

![image](https://github.com/user-attachments/assets/3abdd581-0184-402f-bcdc-4f05d58fbead)

>
> Para a execução do projeto Rachadura de T.I., seguimos uma abordagem baseada em metodologias ágeis, especialmente o Scrum e o processo de Design Thinking. As etapas foram estruturadas visando a colaboração eficiente entre os membros do grupo, a divisão clara de tarefas e o uso de ferramentas modernas para organização, versionamento e acompanhamento do desenvolvimento.

# Solução Implementada

Esta seção apresenta todos os detalhes da solução criada no projeto.

## Vídeo do Projeto

O vídeo a seguir traz uma apresentação do problema que a equipe está tratando e a proposta de solução. 

[![Vídeo do projeto](../docs/Video%20TIAW.mp4)](https://youtu.be/DkaPfengYVo)

Link do vídeo na internet: https://youtu.be/DkaPfengYVo

## Funcionalidades

## Funcionalidade 1 - Cadastro e Autenticação de Usuários

Permite que novos usuários criem uma conta segura na plataforma e que usuários existentes acessem o sistema através de login. O cadastro inclui a coleta de dados pessoais para verificação e para evitar o uso indevido da plataforma, garantindo a seriedade das denúncias.

**Estrutura de dados associada:** `usuarios`

### Instruções de acesso e uso

- Abra o site na página inicial (`login.html`).
- Para se cadastrar:
  - Clique em **"Novo usuário"** para abrir o formulário de registro.
  - Preencha todos os campos, incluindo **nome, usuário, email, CPF, data de nascimento e endereço** (o **CEP** preenche automaticamente parte do endereço).
  - Uma foto de perfil pode ser enviada opcionalmente.
  - Clique em **"Salvar Cadastro"**.
- Para fazer login:
  - Insira seu **nome de usuário** e **senha** na tela principal.
  - Clique em **"Login"**.

![alt text](image.png)

![alt text](image-1.png)
---

## Funcionalidade 2 - Registro de Novas Denúncias

Permite que um usuário logado registre um novo problema urbano. Inclui seleção de categoria, descrição detalhada, upload de mídias (fotos/vídeos) e um sistema de localização inteligente que utiliza o **CEP** para preencher o endereço e o número para obter as coordenadas geográficas (latitude e longitude).

**Estrutura de dados associada:** `denuncias`

### Instruções de acesso e uso

- Após efetuar o login, acesse a página principal (`home_page.html` ou `feed.html`).
- Navegue até a opção **"Cadastrar Denúncia"**.
- Preencha:
  - Título
  - Categoria
  - CEP (o endereço será preenchido automaticamente)
  - Número do local (para gerar as coordenadas geográficas)
  - Adicione mídias (fotos/vídeos)
  - Descrição detalhada
- Clique em **"Salvar Denúncia"** para publicar.

![alt text](image-2.png)
---

## Funcionalidade 3 - Visualização de Denúncias (Feed e Mapa)

Oferece duas formas principais de visualização das denúncias: **mapa interativo** e **feed de notícias em cartões**. Ambas permitem filtrar por categoria.

**Estrutura de dados associada:** `denuncias`

### Instruções de acesso e uso

- Ao fazer login, o usuário é direcionado para `home_page.html`, que exibe o **mapa com marcadores** de denúncias.
  - Clicar em um marcador exibe informações rápidas.
- Na página **"Feed"**, as denúncias aparecem em cartões de lista.
- Em ambas as páginas:
  - Use o **menu suspenso de "Filtro"** para visualizar apenas uma categoria.
  - Clique em uma denúncia para abrir sua **página de detalhes**.

Mapa: 
![alt text](image-3.png)

Feed: 
![alt text](image-4.png)
---

## Funcionalidade 4 - Detalhes, Histórico e Interação com a Denúncia

Centraliza todas as informações de uma denúncia em uma página dedicada. Permite ver detalhes originais, acompanhar o progresso com uma linha do tempo, ver mídias, ler e adicionar comentários, e interagir com botões de **like/dislike**.

**Estruturas de dados associadas:** `denuncias`, `comentarios`, `usuarios`

### Instruções de acesso e uso

- Acesse via Feed ou Mapa clicando em uma denúncia.
- A página de detalhes (`comentarios.html`) será carregada.
- Role para visualizar:
  - Histórico completo na **Linha do Tempo (Timeline)**
  - Mídias associadas
- Na seção de comentários:
  - Leia comentários de outros usuários
  - Se estiver logado, escreva e envie o seu
  - Use os botões **like/dislike**.

![alt text](image-5.png)

---

## Funcionalidade 5 - Atualização do Histórico da Denúncia

Restrita ao autor da denúncia. Permite adicionar atualizações com novos status, notas e mídias, sem editar a denúncia original.

**Estrutura de dados associada:** `denuncias` (atualização de registro existente)

### Instruções de acesso e uso

- Efetue login com a conta que criou a denúncia.
- Navegue até a página de detalhes da denúncia.
- Clique em **"Adicionar Atualização / Editar"**.
- Na página de atualização (`atualizar_denuncia.html`):
  - Informações originais são exibidas apenas para visualização.
  - Selecione um **novo status** (ex.: "Em Análise", "Resolvida").
  - Adicione notas descritivas.
  - Envie novas mídias (fotos/vídeos).
- Clique em **"Salvar Alterações"** para incluir o evento na timeline.

Adicionar atualização:
![alt text](image-6.png)

Atualização da Denúncia:
![alt text](image-7.png)

Atualização da Timeline:
![alt text](image-8.png)

---

## Funcionalidade 6 - Perfil Pessoal e Estatísticas

Oferece ao usuário logado um painel com suas informações e um resumo de sua atividade na plataforma.

**Estruturas de dados associadas:** `usuarios`, `denuncias`

### Instruções de acesso e uso

- Após login, clique no ícone de **perfil** no cabeçalho.
- A página de perfil (`perfil.html`) exibirá:
  - Informações pessoais (nome, usuário, email, CPF, etc.)
  - Painel de estatísticas com resumo das denúncias
  - Lista de todas as denúncias do usuário, com links para detalhes.

![alt text](image-9.png)
---

## Funcionalidade 7 - Visualização de Mídia Externa (Vídeos)

Uma página dedicada que exibe vídeos recentes do YouTube sobre problemas urbanos (ex.: buracos, alagamentos) em **Belo Horizonte**.

**Estrutura de dados associada:** Nenhuma (utiliza a **API externa** do YouTube Data v3).

### Instruções de acesso e uso

- No **menu principal** da aplicação (navbar inferior), clique em **"Mídia"** ou **"Vídeos"**.
- A página (`noticias_videos.html`) carregará:
  - Um **player** com playlist de vídeos relevantes.
  - Controles para som e tela cheia.

![alt text](image-10.png)

---

## Funcionalidade 8 - Portal de Notícias

Apresenta aos usuários uma seleção de notícias de **fontes externas** relacionadas a **urbanismo**, **infraestrutura** e **problemas urbanos** como os reportados na plataforma. O objetivo é manter a comunidade informada sobre o **contexto mais amplo** dos problemas que enfrentam e as soluções que estão sendo implementadas.

**Estrutura de dados associada:** `noticias`

### Instruções de acesso e uso

- Acesse o **menu principal** e clique na seção **"Notícias"** ou **"Mídia"**.
- A página exibirá uma **lista de artigos** em formato de **cartões**, com:
  - Título
  - Categoria
  - Breve resumo da notícia
- O usuário pode ler o **resumo** para entender o tópico.
- Para ler a matéria completa:
  - Clique no **cartão** para ser redirecionado ao **link da fonte original**.


Feed de notícias:
![alt text](image-11.png)

Detalhe das notícias: 
![alt text](image-12.png)
---

## Funcionalidade 9 - FAQ (Perguntas Frequentes)

Oferece uma seção de **autoatendimento** onde os usuários podem encontrar respostas para as **dúvidas mais comuns** sobre o uso da plataforma **Radar Urbano**. O objetivo é fornecer **suporte rápido** e reduzir a necessidade de contato direto para questões recorrentes.

**Estrutura de dados associada:** `faq`

### Instruções de acesso e uso

- Clique no link **"Perguntas Frequentes"** localizado no **rodapé** de qualquer página principal da aplicação.
- A página `faq.html` será carregada, exibindo:
  - Uma **lista de perguntas**.
- Para visualizar a resposta:
  - Clique em qualquer **pergunta** para **expandir** e ver o conteúdo correspondente.

![alt text](image-13.png)

---


## Estruturas de Dados


O banco de dados da aplicação é composto por cinco coleções principais de objetos: **usuarios**, **denuncias**, **comentarios**, **noticias** e **faq**.

---

## 1. usuarios

Armazena todas as informações sobre os usuários cadastrados na plataforma.

- **id** (string): Identificador único para cada usuário (ex: `"user_12345"`).
- **nome** (string): Nome completo do usuário.
- **usuario** (string): Nome de login único escolhido pelo usuário.
- **senha** (string): Senha de acesso do usuário.  
  **Nota:** Em produção, deve ser armazenado um "hash" da senha, não o texto puro.
- **email** (string): Endereço de e-mail do usuário.
- **cpf** (string): CPF do usuário, utilizado para verificação.
- **data_nascimento** (string): Data de nascimento no formato `AAAA-MM-DD`.
- **foto_perfil** (string): URL ou string em Base64 da imagem de perfil.
- **endereco_residencial** (objeto):
  - **cep** (string)
  - **logradouro** (string)
  - **numero** (string)
  - **complemento** (string)
  - **bairro** (string)
  - **cidade** (string)
  - **estado** (string)
- **data_criacao** (string): Data/hora da criação da conta (ISO 8601).
- **nivel** (string): Nível de permissão (ex: `"usuario"`, `"admin"`).
- **status** (string): Status da conta (ex: `"ativo"`, `"inativo"`).

---

## 2. denuncias

Armazena todas as denúncias feitas pelos usuários.

- **id** (string/number): Identificador único da denúncia.
- **usuarioId** (string): ID do usuário que criou a denúncia.
- **titulo** (string): Título curto e objetivo da denúncia.
- **descricao** (string): Texto detalhado descrevendo o problema.
- **categoria** (string): Categoria da denúncia (ex: `"Buracos"`, `"Iluminação"`, `"Esgoto"`).
- **midias** (array de strings): URLs ou Base64 das mídias enviadas na criação.
- **endereco** (objeto):
  - **cep** (string)
  - **logradouro** (string)
  - *(outros campos de endereço)*
  - **lat** (number): Latitude do local.
  - **lng** (number): Longitude do local.
- **dataRegistro** (string): Data/hora da criação (ISO 8601).
- **timeline** (array de objetos): Histórico de todas as atualizações da denúncia, onde cada objeto inclui:
  - **status** (string): Estado atual da denúncia nesse evento (ex: `"Denúncia Criada"`, `"Em Análise"`, `"Resolvida"`).
  - **timestamp** (string): Data/hora da atualização (ISO 8601).
  - **notas** (string): Anotações ou comentários da atualização.
  - **midias** (array de strings): Mídias dessa atualização.
- **likes** (array de strings): IDs dos usuários que curtiram a denúncia.
- **dislikes** (array de strings): IDs dos usuários que não curtiram a denúncia.

---

## 3. comentarios

Armazena todos os comentários feitos pelos usuários nas páginas de detalhes das denúncias.

- **id** (string): Identificador único do comentário.
- **denunciaId** (string/number): ID da denúncia comentada.
- **usuarioId** (string): ID do usuário que fez o comentário.
- **texto** (string): Conteúdo do comentário.
- **data** (string): Data/hora do comentário (ISO 8601).

---

## 4. noticias

Coleção de artigos e notícias externas exibidas no portal.

- **id** (number/string): Identificador único da notícia.
- **categoria** (string): Categoria da notícia.
- **titulo** (string): Título do artigo.
- **resumo** (string): Breve resumo do conteúdo.
- **conteudo** (string): Corpo principal da notícia.
- **data** (string): Data de publicação (`AAAA-MM-DD`).
- **link** (string): URL da fonte original.

---

## 5. faq

Armazena as perguntas e respostas da seção de "Perguntas Frequentes".

- **id** (number): Identificador único da pergunta.
- **pergunta** (string): Texto da pergunta.
- **resposta** (string): Texto da resposta.
- **dataCriacao** (string): Data de criação (`AAAA-MM-DD`).

---


## Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução

**Fonts:**

* Google Fonts - [https://fonts.google.com/](https://fonts.google.com/) 

**Scripts:**

**APIs e Bibliotecas Utilizadas na Aplicação:**

* **Vue.js** – [https://vuejs.org/](https://vuejs.org/)
* **jQuery** – [https://jquery.com/](https://jquery.com/)
* **jQuery Mask Plugin** – [https://igorescobar.github.io/jQuery-Mask-Plugin/](https://igorescobar.github.io/jQuery-Mask-Plugin/)
* **Axios** – [https://axios-http.com/](https://axios-http.com/)
* **Bootstrap 5** – [https://getbootstrap.com/](https://getbootstrap.com/)
* **Bootstrap Icons** – [https://icons.getbootstrap.com/](https://icons.getbootstrap.com/)
* **Google Maps Platform** – [https://developers.google.com/maps](https://developers.google.com/maps)
* **Google Maps JavaScript API** – [https://developers.google.com/maps/documentation/javascript](https://developers.google.com/maps/documentation/javascript)
* **Google Maps Geocoding API** – [https://developers.google.com/maps/documentation/geocoding](https://developers.google.com/maps/documentation/geocoding)
* **YouTube Data API v3** – [https://developers.google.com/youtube/v3](https://developers.google.com/youtube/v3)
* **Fetch API** – [https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API](https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API)
* **Geolocation API** – [https://developer.mozilla.org/pt-BR/docs/Web/API/Geolocation_API](https://developer.mozilla.org/pt-BR/docs/Web/API/Geolocation_API)
* **ViaCEP** – [https://viacep.com.br/](https://viacep.com.br/)
* **JSON Server** – [https://github.com/typicode/json-server](https://github.com/typicode/json-server)

# Referências

As referências utilizadas no trabalho foram:

Referências Bibliográficas (ABNT)
Documentação da API Google Maps:
GOOGLE. Google Maps Platform. 2023. Disponível em: https://developers.google.com/maps. Acesso em: 11/04/2025.

Desenvolvimento de Sistemas Web:
FLANAGAN, David. JavaScript: O Guia Definitivo. 7. ed. Porto Alegre: Bookman, 2020. 1080 p.

Integração de APIs REST:
RICHARDSON, Leonard; RUBY, Sam. RESTful Web APIs. 1. ed. Sebastopol: O’Reilly Media, 2013. 408 p.

Design de UX para Sistemas de Chamados:
NIELSEN, Jakob. Usabilidade na Web. 1. ed. Rio de Janeiro: Campus, 2000. 420 p.

Boas Práticas em Infraestrutura de TI:
TANENBAUM, Andrew S.; VAN STEEN, Maarten. Distributed Systems: Principles and Paradigms. 3. ed. Boston: Pearson, 2017. 800 p.



