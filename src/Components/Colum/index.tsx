import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../Task';

interface ColumnProps {
    id: string;
    title: string;
    taskIds: string[];
    tasks: { [key: string]: any };
}

const Column: React.FC<ColumnProps> = ({ id, title, taskIds, tasks }) => {
    return (
        <div style={{ margin: 8 }}>
            <h3>{title}</h3>
            <Droppable droppableId={id}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} style={{ background: 'lightblue', padding: 8, width: 250, minHeight: 100 }}>
                        {taskIds.map((taskId, index) =>
                            <Task
                                key={taskId}
                                id={tasks[taskId].id}
                                title={tasks[taskId].title}
                                description={tasks[taskId].description}
                                responsible={tasks[taskId].responsible}
                                manager={tasks[taskId].manager}
                                managerApproval={tasks[taskId].managerApproval}
                                startDate={tasks[taskId].startDate}
                                endDate={tasks[taskId].endDate}
                                priority={tasks[taskId].priority}
                                status={tasks[taskId].status}
                                timeEstimate={tasks[taskId].timeEstimate}
                                comments={tasks[taskId].comments}
                                associatedProject={tasks[taskId].associatedProject}
                                subtasks={tasks[taskId].subtasks}
                                attachments={tasks[taskId].attachments}
                                tags={tasks[taskId].tags}
                                updateHistory={tasks[taskId].updateHistory}
                            />)}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
