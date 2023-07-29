//INSTRUÇÕES
console.log(`Instruções de uso
______________

Funções e respectivos parâmetros:

QUESTÃO 1

firstFit(tamanhoNecessario) - lista de bloco de memória passado como parâmetro por padrão;

----------

QUESTÃO 2

roundRobin(processos, quantum) - processos deve ser uma matriz com o nome do processo e seu respectivo tempo de execução.
exemplo:

roundRobin([["P1", 10], ["P2", 5], ["P3", 8]], 3).

----------

QUESTÃO 3

escalonamentoPorPrioridade(processos, temposExecucao, prioridades) - quantum definido como 1 por padrão.
exemplo de uso:

processos => array de strings contendo o nome de cada processo a ser executado;

temposExecucao => array de números inteiros com os tempos de execução correspondentes a cada processo na array 'processos';

prioridades => array de números inteiros com as prioridades correspondentes a cada processo na matriz processos (maior valor = maior prioridade)

----------

QUESTÃO 4

bestFit(tamanhoNecessario) - lista de bloco de memória passado como parâmetro por padrão;

----------

QUESTÃO 5

priorityPreemptive(processos, temposExecucao, prioridades)

exemplo de uso:

processos => array de strings contendo o nome de cada processo a ser executado;

temposExecucao => array de números inteiros com os tempos de execução correspondentes a cada processo na array 'processos';

prioridades => array de números inteiros com as prioridades correspondentes a cada processo na matriz processos (maior valor = maior prioridade)

----------

QUESTÃO 6

agendador_processos(processos, tamanhosProcessos, quantum)

processos => é matriz que contém arrays, onde cada array possui como elemento o nome do processo e tempo de execução, respectivamente.

Exemplo:

[["p1", 5], ["p2", 6], ["p3", 8]];

tamanhosProcessos => é um array que representa os tamanhos dos processos correspondentes a matriz de processos (respectiva ordem). 

Exemplo:

[10, 15, 5];

quantum => é um número inteiro que define o quantum a ser utilizado no escalonamento Round Robin.

`)

//QUESTÃO 1

var memoria = [[true,100], [false, 50], [true, 200], [false, 80], [true, 150], [false, 210], [true, 300], [true, 250], [true, 130], [true, 120]];

function firstFit(tamanhoNecessario, blocosDeMemoria = memoria) {
    console.log("Memoria simulada: [" + memoria + "]")

    for (let i = 0; i < blocosDeMemoria.length; i++) {

      if (blocosDeMemoria[i][0] == true && blocosDeMemoria[i][1] >= tamanhoNecessario) {
       
        return "Índice do bloco alocado: " + i; 
      }
    }
    return -1
  }
  
//QUESTÃO 2
  
function roundRobin(processos, quantum) {
    const numProcessos = processos.length;
    let tempoTotalExecucao = 0;
    let tempoEsperaTotal = 0;
    let temposRestantes = processos.map((processo) => processo[1]);
  
    let tempoAtual = 0;
    let processoAtual = 0;
    while (true) {
      if (temposRestantes[processoAtual] <= quantum) {

        tempoTotalExecucao += temposRestantes[processoAtual];
        tempoEsperaTotal += tempoTotalExecucao - processos[processoAtual][1];
        temposRestantes[processoAtual] = 0;
      } else {
 
        tempoTotalExecucao += quantum;
        temposRestantes[processoAtual] -= quantum;
      }
  
      let todosConcluidos = true;
      for (let i = 0; i < numProcessos; i++) {
        if (temposRestantes[i] > 0) {
          todosConcluidos = false;
          break;
        }
      }
  
      if (todosConcluidos) {
        break;
      }
  
      processoAtual = (processoAtual + 1) % numProcessos;
  
      tempoAtual += quantum;
    }
  
    const tempoMedioEspera = tempoEsperaTotal / numProcessos;
  
    return `Tempo total de execução: ${tempoTotalExecucao} | Tempo médio de espera: ${tempoMedioEspera}`;
  }
  
  //QUESTÃO 3
  
  function escalonamentoPorPrioridade(processos, temposExecucao, prioridades) {
    var quantum = 1
    const numProcessos = processos.length;
    let tempoTotalExecucao = 0;
    let tempoEsperaTotal = 0;
    let processosRestantes = numProcessos;
  
    while (processosRestantes > 0) {
      let processoAtual = -1;
      let maiorPrioridade = -1;
  
      // Encontra o processo com maior prioridade entre os que ainda não foram concluídos
      for (let i = 0; i < numProcessos; i++) {
        if (temposExecucao[i] > 0 && prioridades[i] > maiorPrioridade) {
          maiorPrioridade = prioridades[i];
          processoAtual = i;
        }
      }
  
      // Caso não haja mais processos para executar, sair do loop
      if (processoAtual === -1) break;
  
      // Executa o processo pelo tempo restante de sua execução
      const tempoExecutado = Math.min(temposExecucao[processoAtual], quantum);
      temposExecucao[processoAtual] -= tempoExecutado;
      tempoTotalExecucao += tempoExecutado;
  
      // Atualiza o tempo de espera total para todos os processos com prioridade maior ou igual à do processo executado
      for (let i = 0; i < numProcessos; i++) {
        if (temposExecucao[i] > 0 && prioridades[i] >= prioridades[processoAtual]) {
          tempoEsperaTotal += tempoExecutado;
        }
      }
  
      // Atualiza a quantidade de processos restantes
      processosRestantes -= temposExecucao[processoAtual] === 0 ? 1 : 0;
    }
  
    const tempoMedioEspera = tempoEsperaTotal / numProcessos;
  
    return `Tempo total de execução: ${tempoTotalExecucao} | Tempo médio de espera: ${tempoMedioEspera}`;
  }

//QUESTÃO 4
var memoria_bestFit = [[true,100], [false, 50], [true, 200], [false, 80], [true, 150], [false, 210], [true, 300], [true, 250], [true, 130], [true, 120]];

function bestFit(tamanhoNecessario, blocosDeMemoria = memoria_bestFit) {
    console.log("Memoria simulada: [" + blocosDeMemoria.map((bloco) => `[${bloco[0]}, ${bloco[1]}]`).join(", ") + "]");
  
    let melhorIndice = -1;
    let tamanhoMenorDiferenca = Infinity;
  
    for (let i = 0; i < blocosDeMemoria.length; i++) {
      const bloco = blocosDeMemoria[i];
  
      if (bloco[0] && bloco[1] >= tamanhoNecessario) {
        const diferenca = bloco[1] - tamanhoNecessario;
        if (diferenca < tamanhoMenorDiferenca) {
          tamanhoMenorDiferenca = diferenca;
          melhorIndice = i;
        }
      }
    }
  
    return melhorIndice !== -1 ? "Índice do bloco alocado: " + melhorIndice : -1;
  }
  
//QUESTÃO 5

function priorityPreemptive(processos, temposExecucao, prioridades) {
    const numProcessos = processos.length;
    let tempoTotalExecucao = 0;
    let tempoEsperaTotal = 0;
  
    const temposRestantes = [...temposExecucao];
    const prioridadesRestantes = [...prioridades];
  
    while (true) {
      let processoAtual = -1;
      let maiorPrioridade = -1;
  
      for (let i = 0; i < numProcessos; i++) {
        if (temposRestantes[i] > 0 && prioridadesRestantes[i] > maiorPrioridade) {
          maiorPrioridade = prioridadesRestantes[i];
          processoAtual = i;
        }
      }
  
      if (processoAtual === -1) break;

      temposRestantes[processoAtual]--;
  
      for (let i = 0; i < numProcessos; i++) {
        if (i !== processoAtual && temposRestantes[i] > 0) {
          tempoEsperaTotal++;
        }
      }
 
      tempoTotalExecucao++;
    }
  
    const tempoMedioEspera = tempoEsperaTotal / numProcessos;
  
    return `Tempo total de execução: ${tempoTotalExecucao} | Tempo médio de espera: ${tempoMedioEspera}`;
  }

  //QUESTÃO 6
  
  function agendador_processos(processos, tamanhosProcessos, quantum) {
    // Função para o algoritmo Best Fit
    function bestFit(tamanhoNecessario, blocosDeMemoria) {
      let melhorIndice = -1;
      let tamanhoMenorDiferenca = Infinity;
  
      for (let i = 0; i < blocosDeMemoria.length; i++) {
        const bloco = blocosDeMemoria[i];
  
        if (bloco[0] && bloco[1] >= tamanhoNecessario) {
          const diferenca = bloco[1] - tamanhoNecessario;
          if (diferenca < tamanhoMenorDiferenca) {
            tamanhoMenorDiferenca = diferenca;
            melhorIndice = i;
          }
        }
      }
  
      return melhorIndice;
    }
  
    const ordemExecucao = [];
    const memoria = [];
  
    // Cria a matriz de memória com os tamanhos dos processos
    for (let i = 0; i < tamanhosProcessos.length; i++) {
      memoria.push([true, tamanhosProcessos[i]]);
    }
  
    // Executa o algoritmo Best Fit para alocar os processos na memória
    for (const processo of processos) {
      const indiceBlocoAlocado = bestFit(processo[1], memoria);
      if (indiceBlocoAlocado !== -1) {
        memoria[indiceBlocoAlocado][0] = false;
        ordemExecucao.push(processo[0]);
      }
    }
  
    // Executa o algoritmo Round Robin para a ordem de execução definida
    const numProcessos = ordemExecucao.length;
    const temposRestantes = processos.map((processo) => processo[1]);
    let tempoAtual = 0;
  
    while (true) {
      let processoAtual = -1;
  
      for (let i = 0; i < numProcessos; i++) {
        if (temposRestantes[i] > 0) {
          processoAtual = i;
          const tempoExecutado = Math.min(quantum, temposRestantes[i]);
          temposRestantes[i] -= tempoExecutado;
          tempoAtual += tempoExecutado;
  
          if (temposRestantes[i] === 0) {
            ordemExecucao[i] += ` (Tempo de execução: ${tempoAtual})`;
          }
        }
      }
  
      let todosConcluidos = true;
      for (let i = 0; i < numProcessos; i++) {
        if (temposRestantes[i] > 0) {
          todosConcluidos = false;
          break;
        }
      }
  
      if (todosConcluidos) {
        break;
      }
    }
  
    return ordemExecucao;
  }
  