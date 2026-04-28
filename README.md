# MarketPlace APP

Este é um projeto de e-commerce desenvolvido em React, focado em demonstrar uma arquitetura de gestão de estado moderna, eficiente e escalável. A aplicação permite a navegação por um catálogo de produtos e a gestão de um carrinho de compras em tempo real.

## Arquitetura e Decisões Técnicas

Para a definição da arquitetura, realizei uma análise detalhada dos requisitos funcionais, focando na eficiência do fluxo de dados. A principal decisão estratégica foi a separação de responsabilidades entre Server State (dados da API) e Client State (estado local).

Embora o Redux Toolkit seja uma solução robusta, optei por uma abordagem híbrida utilizando Zustand e TanStack Query. Esta escolha resultou numa redução significativa de boilerplate, maior performance e um código muito mais legível.

## Stack Tecnológica & Gestão de Estado

### TanStack Query (Server State)

Os produtos são consumidos da FakeStore API. Por serem dados dinâmicos, o TanStack Query foi implementado para garantir a integridade da informação:

- Caching Inteligente: Otimização de performance ao evitar requisições redundantes.
- Sincronização Reativa (Background Sync):
  - Políticas de Refetching: Configuração de atualizações automáticas em segundo plano para garantir que preços e inventário permaneçam sincronizados com o servidor.
  - Consistência do Carrinho: Caso ocorra uma alteração de valores na API durante a sessão, o sistema sincroniza automaticamente o estado local.
  - Notificações de Atualização: Implementei um mecanismo de alerta que notifica o utilizador sempre que regressa à página do Carrinho e deteta uma variação nos dados originais. Esta transparência assegura que o utilizador esteja ciente de qualquer alteração de preço antes de proceder ao checkout.
- Controlo Declarativo: Gestão simplificada de estados de loading, error e success, proporcionando um feedback visual fluido ao utilizador.

### Zustand (Client State)

O Carrinho de Compras é um estado estritamente local. O Zustand foi selecionado pela sua simplicidade e performance:

- Performance Otimizada: Através de subscrições seletivas, o Zustand evita re-renderizações desnecessárias em toda a árvore de componentes. Apenas os elementos que consomem propriedades específicas do estado são atualizados, garantindo uma interface extremamente fluida.
- Persistência de Sessão (Middleware): Utilização do middleware de persistência para sincronização automática com a Web Storage API (localStorage).
  - Continuidade da Experiência: Os itens permanecem guardados mesmo após o refresh da página ou o encerramento do browser.

  - Ciclo de Vida do Cache: O localStorage é gerido de forma inteligente, sendo limpo apenas aquando da finalização da compra ou por ação direta do utilizador (limpeza do carrinho), evitando a acumulação de dados obsoletos.

- Lógica de Negócio Desacoplada: Todas as operações críticas — adicionar, remover, incrementar quantidades e cálculos de totais — estão isoladas em actions dentro da store. Este desacoplamento da interface facilita a manutenção do código e a implementação de testes unitários.

## Tratamento de Erros

Para garantir uma aplicação robusta e evitar falhas silenciosas, implementei uma estratégia de tratamento de erros centralizada e proativa:

Monitorização de Requisições
Utilizando o estado fornecido pelo TanStack Query, a aplicação monitoriza continuamente a integridade das chamadas à FakeStore API. Através da propriedade hasError (exposta pelo hook customizado useProduct), o sistema deteta instantaneamente qualquer falha de conectividade ou resposta inválida do servidor.

## Interface & UX

A interface da aplicação foi projetada com foco na consistência e na redução do esforço cognitivo do utilizador, apresentando as seguintes características:

A aplicação utiliza um Header fixo, garantindo que os controlos de navegação e a identidade do projeto estejam sempre acessíveis. Este elemento permite uma transição fluida entre o Marketplace (listagem) e o Carrinho de Compras sem que o utilizador perca o contexto da sua navegação.

Um dos pilares da experiência do utilizador (UX) neste projeto é a natureza dinâmica do acesso ao Carrinho no Header:

- Monitorização de Estado: O componente observa o estado global (Zustand) de forma contínua.
- Sincronização Automática: Sempre que um produto é adicionado, removido ou tem a sua quantidade alterada, o Header reflete instantaneamente a quantidade total de itens e o preço acumulado.
- Otimização de Fluxo: Esta funcionalidade permite que o utilizador acompanhe o progresso das suas compras em tempo real, eliminando a necessidade de navegação redundante para validar o conteúdo do carrinho.

## Listagem de Produtos

A página de listagem de produtos integra o catálogo principal com um sistema de filtros dinâmicos e ordenação.

- Mecanismo de Debouncing: A pesquisa por nome utiliza Debouncing, garantindo que a lógica de filtragem seja disparada apenas após um curto intervalo de inatividade na digitação. Esta técnica evita re-renderizações excessivas e otimiza o processamento da aplicação.
- Processamento Client-side: Toda a filtragem e ordenação por preço são executadas localmente sobre o dataset já hidratado. Ao eliminar a necessidade de novas requisições HTTP para estas operações, a interface oferece uma resposta mais fluida.

### Layout e Responsividade

A exibição dos produtos é estruturada através de uma Flex Grid, selecionada pela sua versatilidade no controlo de layouts responsivos:

- Restrições Visuais: Foi definido um max-width de 1024px e um limite de 4 produtos por linha em ecrãs de alta resolução, priorizando a hierarquia visual e a estética.
- Adaptabilidade: O número de colunas é dinâmico, ajustando-se automaticamente às dimensões do ecrã para manter a fluidez da experiência em dispositivos móveis.
- Componente de Produto: Cada card contém quatro elementos essenciais — imagem, título, preço e um botão de ação. A adição de um item ao carrinho desencadeia um feedback visual imediato no Header, atualizando de forma síncrona tanto o contador de unidades como o valor total acumulado.

### Gestão de Dados e Ciclo de Vida

O fluxo de dados é gerido pelo TanStack Query através do hook customizado useProduct.

- Estados de Carregamento: Durante a fase de hidratação inicial, a propriedade isLoading é utilizada para renderizar um Spinner de carregamento. Este indicador visual é configurado para aparecer exclusivamente no primeiro carregamento da aplicação, proporcionando um feedback sobre o progresso da operação sem interromper a navegação em atualizações subsequente.
- Sincronização: Para assegurar que dados sensíveis, como preços e inventário, permanecem atualizados, foram implementadas políticas de cache rigorosas:
  - Stale Time & Refetch Interval (30s): Configurados em 30.000ms, garantindo que os dados sejam revalidados periodicamente em background.
  - Feedback de Sincronização: Sempre que um refetch automático ocorre em segundo plano, o utilizador é informado através de uma Loading Bar discreta posicionada abaixo do Header.

## Gestão do Carrinho de Compras

A página do Carrinho foi desenvolvida para oferecer um controlo granular sobre os itens selecionados, utilizando uma lógica de renderização condicional para gerir os diferentes estados da interface:

### Estados da Interface

- Empty State: Caso o carrinho não contenha elementos, é apresentada uma mensagem de aviso amigável, informando o utilizador e incentivando o retorno ao marketplace.
- Carrinho Ativo: Quando existem produtos no estado local, a aplicação gera uma listagem dinâmica onde cada item ocupa uma linha dedicada, independentemente da sua quantidade.
- Validação de Integridade (Estado Inválido): Para prevenir a finalização de pedidos inconsistentes, a store do Zustand inclui um seletor de validação.
  - Lógica de Verificação: O seletor filtra os itens do carrinho em busca de qualquer produto com quantidade igual a zero.
  - Bloqueio de Checkout: Caso seja detetado um estado inválido (ex: um produto que foi reduzido a zero mas ainda consta na lista), o botão de Checkout é automaticamente desativado. Esta regra de negócio garante que apenas transações com quantidades válidas possam avançar para a finalização.

### Interatividade e Controlo de Itens

A listagem é estruturada numa Flex Grid responsiva, onde cada componente de produto expõe funcionalidades críticas:

- Ajuste Dinâmico de Quantidade: O utilizador pode alterar a quantidade de cada produto diretamente. Estas mutações são processadas em tempo real pelo Zustand, atualizando instantaneamente os totais da página e do Header.

- Remoção Automática: Implementação de lógica de segurança onde, caso a quantidade de um produto seja reduzida a zero, o item é automaticamente removido do estado global.

- Dados Detalhados: Cada linha exibe a imagem, título, preço unitário, subtotal calculado e um botão para remoção imediata do item.

### Finalização e Sumário

No rodapé da página, a aplicação agrega a informação final para o utilizador:

- Métricas Globais: Exibição do número total de produtos e do valor total da encomenda.

- Ações Primárias:
  - Limpar Carrinho: Reseta integralmente o estado local do carrinho através de uma única ação atómica.

  - Finalizar Pedido: Ponto de entrada para o fluxo de checkout da aplicação.

#### Fluxo de Recuperação e Feedback

Sempre que uma falha crítica é identificada, a aplicação aciona um fluxo de tratamento de exceções:

- Redirecionamento Automático: O utilizador é encaminhado para uma Página de Erro dedicada, evitando que a interface fique num estado inconsistente ou "congelado".

- Diagnóstico Contextualizado: Nesta página, são apresentados os detalhes técnicos e a mensagem de erro correspondente. Isto permite que o utilizador compreenda a natureza do problema (ex: erro de rede ou indisponibilidade da API) e receba orientações para retomar a navegação.

## Considerações Futuras e Pontos de Melhoria

Apesar da robustez da arquitetura atual, foram identificadas áreas passíveis de otimização e expansão, tendo em conta as limitações da infraestrutura de dados (API):

### Paginação e Virtualização

Devido ao facto de a FakeStore API fornecer um limite máximo de 20 produtos, optou-se por não implementar paginação ou um seletor de densidade de itens (elementos por página). Num cenário de produção com um dataset superior, seria essencial a introdução de Paginação ou de um Infinite Scroll.

### Gestão de Inventário (Stock) e Limites de Compra

A API utilizada não fornece metadados relativos ao stock em tempo real de cada produto. Perante esta limitação:

- Implementação Atual: Estabeleci um limite arbitrário de 50 unidades por produto para prevenir abusos na interface e garantir a estabilidade do estado.

- Melhoria Futura: A introdução de uma propriedade stock no payload da API permitiria uma validação de inventário real. Atualmente, o processo de Resync (sincronização em background) foca-se na integridade de preços e na disponibilidade do artigo, mas deveria idealmente validar também a disponibilidade de quantidades remanescentes antes do checkout.

### Evolução do Mecanismo de Sincronização

O sistema de sincronização atual é reativo a preços e presença de produtos. Uma evolução lógica seria a implementação de um sistema de Reconciliação de Inventário, onde o carrinho seria capaz de ajustar automaticamente as quantidades selecionadas pelo utilizador com base no stock real retornado pelo servidor durante o polling.

### Estratégia de Testes

Reconheço a necessidade de expandir a cobertura de testes para alcançar uma pirâmide de testes saudável:

- Testes de Integração: Necessários para validar a interação entre os custom hooks (como o useProduct) e os componentes, garantindo que o fluxo de dados entre o TanStack Query e a UI não sofra regressões.

- End-to-End (E2E): Implementação futura de fluxos completos (ex: utilizando Cypress ou Playwright) para simular a jornada do utilizador, desde a pesquisa do produto até à finalização do pedido no carrinho.

- Testes de Regressão Visual: Introdução de ferramentas como o Chromatic ou Storybook Runner para garantir a integridade da interface em diferentes resoluções e browsers, prevenindo que alterações no CSS quebrem componentes existentes.

# Como Instalar e Executar

```bash
# Instalar dependências
git clone https://github.com/kevin-costa47/marketplace-app.git

# Instalar dependências
npm install

# Iniciar em modo de desenvolvimento
npm run dev

# Executar testes
npm test

# Build para produção
npm run build
```
