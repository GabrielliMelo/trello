import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import dayjs from 'dayjs';
import Modal from '../Modal'
import DropDowns from '../DropDowns'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

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

const Task: React.FC<TaskProps> = ({
    id,
    title,
    responsible,
    managerApproval,
    startDate,
    endDate,
    priority,
    associatedProject,
    description
}) => {

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    const handleCardClick = (value: boolean): any => {
        setIsModalOpen(value);
    };


    const formatDate = (dateString: string) => {
        return dayjs(dateString).format('DD/MM/YYYY');
    };

    const getPriorityColor = (priority: string) => {
        const colors: any = {
            Alta: 'bg-red-500',
            Média: 'bg-orange-500',
            Baixa: 'bg-blue-500',
        };
        return colors[priority] || 'bg-gray-200';
    };

    const getApprovalColor = (approval: boolean) => {
        return approval ? 'bg-green-500' : 'bg-red-500';
    };

    return (
        <>
            <Draggable draggableId={id} index={Number(id)}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white shadow-lg rounded-lg p-4 mb-4"
                        onClick={() => handleCardClick(true)}
                    >
                        <div className="bg-purple-200 text-purple-700 px-4 py-1 inline-block rounded-full text-sm font-medium mb-4">
                            {associatedProject}
                        </div>
                        <h3 className="text-md font-semibold mb-2 truncate text-start">{title}</h3>
                        <div className="flex items-center mb-2">
                            <span className="text-gray-700 font-medium mr-2">Responsible:</span>
                            {responsible.map(name => (
                                <span className="text-sm text-gray-600 mr-1" key={name}>{name}</span>
                            ))}
                        </div>

                        <div className="flex justify-start items-center mb-2">
                            <span className="text-gray-700 font-medium">Manager aproval:</span>
                            <span className={`inline-block ${getApprovalColor(managerApproval)} text-white px-4 py-1 rounded-full text-sm ml-2`}>
                                {managerApproval ? 'Sim' : 'Não'}
                            </span>
                        </div>

                        <div className="flex justify-start items-center">
                            <span className="text-gray-700 font-medium">Prioridade:</span>
                            <span className={`inline-block ${getPriorityColor(priority)} text-white px-4 py-1 rounded-full text-sm ml-2`}>
                                {priority}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 flex justify-start items-center">start Date: {formatDate(startDate)}</div>
                        <div className="text-xs text-gray-500 mt-2 flex justify-start items-center">End Date: {formatDate(endDate)}</div>

                    </div>
                )}
            </Draggable>
            <Modal isOpen={isModalOpen} onToggleModal={() => handleCardClick(true)}>
                <div className="bg-white p-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="relative">
                            <img
                                src="https://s2-galileu.glbimg.com/9uHHuZrRDHRZsgP3UKqx40thz-E=/0x0:800x450/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_fde5cd494fb04473a83fa5fd57ad4542/internal_photos/bs/2022/U/j/XrUuhZTZKvZEE7KWnglw/e.t.o-extraterrestre-foto-divulgacao-widelg.jpg"
                                alt="User avatar"
                                className="h-10 w-10 rounded-full"
                            />
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400" />
                        </div>

                        <button className="ml-4">
                            +
                        </button>
                    </div>

                    <div className="flex items-center">
                        <button className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                            <span>Clonar</span>
                        </button>
                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    Opções
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Menu.Button>

                                <DropDowns />
                            </Menu>
                        </div>

                    </div>
                </div>

                <div className="border-t border-gray-200 "></div>
                <p className="text-sm font-bold mb-2">Título: {title}</p>
                <p className="text-sm mb-2">Descrição: {description}</p>
                <p className="text-sm mb-2">Responsável: {responsible.join(', ')}</p>
                <p className="text-sm mb-2">Início: {formatDate(startDate)}</p>
                <p className="text-sm mb-2">Conclusão: {formatDate(endDate)}</p>
            </Modal>
        </>

    );
};

export default Task;
