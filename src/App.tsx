import React from 'react';
import './App.css';

import Board from './Components/Board'

interface BoardChoice {
  Title: string;
  Choices: string[];
}


interface TaskProps {
  id: string;
  title: string;
  description: string;
  responsible: string[];
  manager: string[];
  managerApproval: boolean;
  startDate: string;
  endDate: string;
  priority: string;
  status: string;
  timeEstimate: number;
  comments: string;
  associatedProject: string;
  subtasks: string[];
  attachments: File[];
  tags: string[];
  updateHistory: string[];
}

const MeusQuadros: BoardChoice[] = [
  { Title: 'status', Choices: ['Em andamento', 'Fazendo', 'Validação', 'Finalizada'] },
  { Title: 'gestor', Choices: ['Gabrielli', 'Giovanna'] },
  { Title: 'prioridade', Choices: ['Alta', 'Média', 'Baixa'] }
];

const tarefasExemplo: any = [
  // const tarefasExemplo: { [key: string]: TaskProps[] } = {
  // 'Em andamento': [
  {
    id: 'task-1',
    title: 'Desenvolver Interface',
    description: 'Desenvolver a interface principal do projeto X.',
    responsible: ['João'],
    manager: ['Ana'],
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
    id: 'task-2',
    title: 'Desenvolver Interface',
    description: 'Desenvolver a interface principal do projeto X.',
    responsible: ['João'],
    manager: ['Ana'],
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
]
// };

const todasTarefas: any = {};
// Object.values(tarefasExemplo).forEach(tasks => {
tarefasExemplo.forEach((task: any) => {
  // tasks.forEach((task: any) => {
  todasTarefas[task.id] = task;
  // });
});

function App() {

  const [selectedBoardTitle, setSelectedBoardTitle] = React.useState(MeusQuadros[0].Title);
  const handleBoardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBoardTitle(event.target.value);
  };

  const getColumnsFromChoices = (choices: string[]) => {
    return choices.reduce((columns, choice) => {
      const taskIds = Object.keys(todasTarefas).filter(taskId => {
        return todasTarefas[taskId].status === choice;
      });

      columns[choice] = {
        id: choice,
        title: choice,
        taskIds: taskIds
      };
      return columns;
    }, {} as { [key: string]: { id: string, title: string, taskIds: string[] } });
  };


  const selectedBoard = MeusQuadros.find(board => board.Title === selectedBoardTitle);
  const columns = selectedBoard ? getColumnsFromChoices(selectedBoard.Choices) : {};

  return (
    <div className="App">
      <select value={selectedBoardTitle} onChange={handleBoardChange}>
        {MeusQuadros.map((board, index) => (
          <option key={index} value={board.Title}>{board.Title}</option>
        ))}
      </select>
      <Board columns={columns} tasks={todasTarefas} />
    </div>
  );
}

export default App;
