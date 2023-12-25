import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../Colum';

interface BoardProps {
    columns: { [key: string]: { id: string, title: string, taskIds: string[] } };
    tasks: { [key: string]: { id: string, content: string } };
}

const Board: React.FC<BoardProps> = ({ columns, tasks }) => {
    return (
        <DragDropContext onDragEnd={() => { /* Implementar lógica de arrastar e soltar aqui */ }}>
            <div style={{ display: 'flex' }}>
                {Object.keys(columns).map((columnId) => {
                    const column = columns[columnId];
                    return <Column key={column.id} id={column.id} title={column.title} taskIds={column.taskIds} tasks={tasks} />;
                })}
            </div>
        </DragDropContext>
    );
};

export default Board;
