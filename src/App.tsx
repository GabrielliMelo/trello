import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Components/Colum';
import './App.css';


interface BoardChoice {
  Title: string;
  Choices: string[];
}

const MeusQuadros: BoardChoice[] = [
  { Title: 'status', Choices: ['Em andamento', 'Fazendo', 'Validação', 'Finalizada'] },
  { Title: 'manager', Choices: ['Gabrielli', 'Ana', 'Carlos'] },
  { Title: 'priority', Choices: ['Alta', 'Média', 'Baixa'] }
];

const tarefasExemplo = [
  {
    id: '1',
    manager: 'Ana',
    title: 'Desenvolver Interface',
    description: 'Desenvolver a interface principal do projeto X.',
    responsible: ['João'],
    managerApproval: false,
    startDate: '2022-01-01',
    endDate: '2022-02-01',
    priority: 'Alta',
    status: 'Em andamento',
    timeEstimate: 20,
    comments: 'Precisamos acelerar essa tarefa.',
    associatedProject: 'Projeto X',
    subtasks: ['Subtarefa 1', 'Subtarefa 2'],
    attachments: [],
    tags: ['interface', 'urgente'],
    updateHistory: ['2022-01-05: Início da tarefa']
  },
  {
    id: '2',
    manager: 'Carlos',
    title: 'Revisar Documentação',
    description: 'Revisar toda a documentação do projeto Y.',
    responsible: ['Maria'],
    managerApproval: true,
    startDate: '2022-02-01',
    endDate: '2022-03-01',
    priority: 'Média',
    status: 'Validação',
    timeEstimate: 15,
    comments: 'Verificar atualizações recentes.',
    associatedProject: 'Projeto Y',
    subtasks: ['Revisão 1', 'Revisão 2'],
    attachments: [],
    tags: ['documentação'],
    updateHistory: ['2022-02-10: Revisão iniciada']
  },
  {
    id: '3',
    manager: 'Gabrielli',
    title: 'Testar Novas Funcionalidades',
    description: 'Testar as novas funcionalidades do projeto Z.',
    responsible: ['Pedro'],
    managerApproval: false,
    startDate: '2022-03-01',
    endDate: '2022-04-01',
    priority: 'Baixa',
    status: 'Finalizada',
    timeEstimate: 30,
    comments: 'Foco nos testes de usabilidade.',
    associatedProject: 'Projeto Z',
    subtasks: ['Teste 1', 'Teste 2'],
    attachments: [],
    tags: ['testes', 'usabilidade'],
    updateHistory: ['2022-03-05: Testes começaram']
  },
  {
    id: '4',
    manager: 'Rafael',
    title: 'Atualizar Banco de Dados',
    description: 'Realizar atualizações críticas no banco de dados do projeto W.',
    responsible: ['Clara'],
    managerApproval: true,
    startDate: '2022-04-10',
    endDate: '2022-05-10',
    priority: 'Alta',
    status: 'Fazendo',
    timeEstimate: 40,
    comments: 'Checar compatibilidade com sistemas legados.',
    associatedProject: 'Projeto W',
    subtasks: ['Backup', 'Atualização', 'Teste'],
    attachments: [],
    tags: ['banco de dados', 'crítico'],
    updateHistory: ['2022-04-12: Backup realizado']
  },
  {
    id: '5',
    manager: 'Sofia',
    title: 'Melhorar SEO do Site',
    description: 'Implementar melhorias de SEO no site do projeto V.',
    responsible: ['Beatriz'],
    managerApproval: false,
    startDate: '2022-05-15',
    endDate: '2022-06-15',
    priority: 'Média',
    status: 'Em andamento',
    timeEstimate: 25,
    comments: 'Focar em palavras-chave de alto tráfego.',
    associatedProject: 'Projeto V',
    subtasks: ['Análise de palavras-chave', 'Otimização de conteúdo'],
    attachments: [],
    tags: ['SEO', 'website'],
    updateHistory: ['2022-05-18: Análise de palavras-chave completa']
  },
  {
    id: '6',
    manager: 'Helena',
    title: 'Desenvolvimento de App Mobile',
    description: 'Iniciar o desenvolvimento do app mobile para o projeto U.',
    responsible: ['Luís'],
    managerApproval: true,
    startDate: '2022-06-20',
    endDate: '2022-08-20',
    priority: 'Baixa',
    status: 'Planejamento',
    timeEstimate: 60,
    comments: 'Definir roadmap inicial com o time de design.',
    associatedProject: 'Projeto U',
    subtasks: ['Definição de requisitos', 'Esboço de design'],
    attachments: [],
    tags: ['mobile', 'planejamento'],
    updateHistory: ['2022-06-25: Requisitos definidos']
  },
  {
    id: '7',
    manager: 'Diana',
    title: 'Otimização de Performance',
    description: 'Otimizar a performance do sistema no projeto T.',
    responsible: ['Eduardo'],
    managerApproval: false,
    startDate: '2022-08-01',
    endDate: '2022-09-01',
    priority: 'Baixa',
    status: 'Validação',
    timeEstimate: 15,
    comments: 'Revisar uso de memória e processamento.',
    associatedProject: 'Projeto T',
    subtasks: ['Análise de desempenho', 'Implementação de melhorias'],
    attachments: [],
    tags: ['performance', 'otimização'],
    updateHistory: ['2022-08-05: Análise de desempenho iniciada']
  }
];

function App() {
  //item selecionado no Menu
  const [selectedBoardTitle, setSelectedBoardTitle] = React.useState('status');
  //Lista de task feita inicialmente no get()
  const [ListTasks, setListTasks] = React.useState<any[]>([]);
  //Campos do tipo choices formatados para ter Title e suas choices
  const [MeusQuadrosIniciais, setMeusQuadrosIniciais] = React.useState<any[]>([]);
  //Colunas formatadas a partir da escolha do select
  const [columnsDinamic, setcolumnsDinamic] = React.useState<any>({});
  //Lista de tasks formatada para o trello
  const [TasksDinamics, setTasksDinamics] = React.useState<any[]>(tarefasExemplo);

  const getColumnsFromChoices = (choices: string[], Internalname: string) => {

    const todasTarefas: any = {};
    ListTasks.forEach((task: any, index) => {
      todasTarefas[task.id] = task;
    });


    setTasksDinamics(todasTarefas)

    return choices.reduce((columns, choice) => {
      const taskIds = Object.keys(todasTarefas).filter(taskId => {
        return todasTarefas[taskId][Internalname] === choice;
      });

      columns[choice] = {
        id: choice,
        title: choice,
        taskIds: taskIds.sort()
      };
      return columns;
    }, {} as { [key: string]: { id: string, title: string, taskIds: string[] } });
  };

  const handleBoardChange = (event: React.ChangeEvent<HTMLSelectElement> | string) => {
    let selectedValue: string;

    if (typeof event === 'string') {
      selectedValue = event;
    } else {
      selectedValue = event.target.value;
    }

    setSelectedBoardTitle(selectedValue);

    const selectedBoard = MeusQuadrosIniciais.find(board => board.Title === selectedValue);
    const columns = selectedBoard ? getColumnsFromChoices(selectedBoard.Choices, selectedValue) : {};

    setcolumnsDinamic(columns);
  };


  const updatePropertyById = (list: any[], id: string, propName: string, newValue: string) => {
    return list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          [propName]: newValue
        };
      }
      return item;
    });
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      console.log('Mantendo no mesmo lugar')
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = columnsDinamic[source.droppableId];
    const finish = columnsDinamic[destination.droppableId];

    if (start.id !== finish.id) {
      let indexTask = start.taskIds.indexOf(draggableId)
      let formatStartColumn = start.taskIds.splice(indexTask, 1);
      finish.taskIds.push(formatStartColumn[0])
      let teste = updatePropertyById(ListTasks, draggableId, selectedBoardTitle, finish.title)
      setListTasks(teste)
    }

    // if (start.id === finish.id) {
    //   console.log('Mudando posição na coluna')
    //   return
    // } else {
    //   console.log('Mudando card de coluna')

    //   const startTaskIds = Array.from(start.taskIds);
    //   let startColum = startTaskIds.splice(source.index, 1);

    //   const finishTaskIds = Array.from(finish.taskIds);
    //   finishTaskIds.splice(destination.index, 0, draggableId);

    //   setcolumnsDinamic((prevColumns: any) => {
    //     const newStart = { ...prevColumns[start.id], taskIds: startColum.sort() };
    //     const newFinish = { ...prevColumns[finish.id], taskIds: finishTaskIds.sort() };

    //     return {
    //       ...prevColumns,
    //       [newStart.id]: newStart,
    //       [newFinish.id]: newFinish,
    //     };
    //   });
    // }
  };


  useEffect(() => {
    handleBoardChange('status')
    setListTasks(tarefasExemplo)
    setMeusQuadrosIniciais(MeusQuadros)
  }, [])

  return (
    <div className="App">
      <select value={selectedBoardTitle} onChange={handleBoardChange}>
        {MeusQuadros.map((board, index) => (
          <option key={index} value={board.Title}>{board.Title}</option>
        ))}
      </select>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div style={{ display: 'flex' }}>
          {Object.keys(columnsDinamic).map((columnId) => {
            const column = columnsDinamic[columnId];
            return <Column key={column.id} id={column.id} title={column.title} taskIds={column.taskIds} tasks={TasksDinamics} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
