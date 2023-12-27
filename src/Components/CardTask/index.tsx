import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

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

const CardTask: React.FC<TaskProps> = ({ id, title, description, responsible, manager, managerApproval, startDate, endDate,
    priority, status, timeEstimate, comments, associatedProject, subtasks, attachments, tags, updateHistory }) => {

    const [showDetails, setShowDetails] = React.useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <Draggable draggableId={id} index={Number(id)}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white shadow-lg rounded-lg p-6 mb-4"
                >
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{description}</p>
                    {
                        showDetails && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Responsável:</span>
                                    <select name="responsible" className="border border-gray-300 rounded p-1 text-gray-700">
                                        {responsible.map((res: string) => <option key={res} value={res}>{res}</option>)}
                                    </select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Gestor:</span>
                                    <span className="text-gray-700">{manager}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Aprovação do Gestor:</span>
                                    <input type="checkbox" checked={managerApproval} className="rounded text-indigo-600" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Data de Início:</span>
                                    <input type="date" className="border border-gray-300 rounded p-1 text-gray-700" value={startDate} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Data de Conclusão:</span>
                                    <input type="date" className="border border-gray-300 rounded p-1 text-gray-700" value={endDate} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Prioridade:</span>
                                    <select name="priority" className="border border-gray-300 rounded p-1 text-gray-700" value={priority}>
                                        <option value="Alta">Alta</option>
                                        <option value="Média">Média</option>
                                        <option value="Baixa">Baixa</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Status:</span>
                                    <select name="status" className="border border-gray-300 rounded p-1 text-gray-700" value={status}>
                                        <option value="To-do">To-do</option>
                                        <option value="Em Progresso">Em Progresso</option>
                                        <option value="Bloqueada">Bloqueada</option>
                                        <option value="Revisão">Revisão</option>
                                        <option value="Concluída">Concluída</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Estimativa de Tempo (horas):</span>
                                    <input type="number" className="border border-gray-300 rounded p-1 text-gray-700" value={timeEstimate} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Comentários/Notas:</span>
                                    <textarea className="border border-gray-300 rounded p-1 text-gray-700 w-full"></textarea>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Projeto Associado:</span>
                                    <input type="text" className="border border-gray-300 rounded p-1 text-gray-700" value={associatedProject} />
                                </div>

                                <ul className="list-disc pl-5">
                                    {subtasks.map((subtask: string) => <li key={subtask}>{subtask}</li>)}
                                </ul>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Anexos:</span>
                                    <input type="file" className="border border-gray-300 rounded p-1 text-gray-700" multiple />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700 font-medium">Tags/Categorias:</span>
                                    <input type="text" className="border border-gray-300 rounded p-1 text-gray-700" />
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold mb-2">Histórico de Atualizações:</h4>
                                    <ul className="list-disc pl-5">
                                        {updateHistory.map((update: string) => <li key={update}>{update}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )
                    }

                    <button onClick={toggleDetails} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {showDetails ? 'Ver Menos' : 'Ver Mais'}
                    </button>

                </div>
            )}
        </Draggable>
    );
};

export default CardTask;
