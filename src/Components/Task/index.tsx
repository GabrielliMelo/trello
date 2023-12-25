import React from 'react';
import styles from './Task.module.css';

// interface ContentProps {
//     id: string;

// }

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

const Task: React.FC<TaskProps> = ({ id, title,
    description,
    responsible,
    manager,
    managerApproval,
    startDate,
    endDate,
    priority,
    status,
    timeEstimate,
    comments,
    associatedProject,
    subtasks,
    attachments,
    tags,
    updateHistory, }) => {

    const [showDetails, setShowDetails] = React.useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className={styles.taskContainer}>
            <h3 className={styles.taskTitle}>{title}</h3>
            <p>{description}</p>

            <label className={styles.taskLabel}>
                Responsável:
                <select name="responsible" className={styles.taskSelect}>
                    {responsible.map((res: string) => <option key={res} value={res}>{res}</option>)}
                </select>
            </label>

            <label className={styles.taskLabel}>
                Gestor:
                <select name="manager" className={styles.taskSelect}>
                    {manager.map((mgr: string) => <option key={mgr} value={mgr}>{mgr}</option>)}
                </select>
            </label>

            {
                showDetails && (
                    <>
                        <label className={styles.taskLabel}>
                            Aprovação do Gestor:
                            <input type="checkbox" checked={managerApproval} />
                        </label>

                        <label className={styles.taskLabel}>
                            Data de Início:
                            <input type="date" className={styles.taskInput} value={startDate} />
                        </label>

                        <label className={styles.taskLabel}>
                            Data de Conclusão:
                            <input type="date" className={styles.taskInput} value={endDate} />
                        </label>

                        <label className={styles.taskLabel}>
                            Prioridade:
                            <select name="priority" className={styles.taskSelect} value={priority}>
                                <option value="Alta">Alta</option>
                                <option value="Média">Média</option>
                                <option value="Baixa">Baixa</option>
                            </select>
                        </label>

                        <label className={styles.taskLabel}>
                            Status:
                            <select name="status" className={styles.taskSelect} value={status}>
                                <option value="To-do">To-do</option>
                                <option value="Em Progresso">Em Progresso</option>
                                <option value="Bloqueada">Bloqueada</option>
                                <option value="Revisão">Revisão</option>
                                <option value="Concluída">Concluída</option>
                            </select>
                        </label>

                        <label className={styles.taskLabel}>
                            Estimativa de Tempo (horas):
                            <input type="number" className={styles.taskInput} value={timeEstimate} />
                        </label>

                        <label className={styles.taskLabel}>
                            Comentários/Notas:
                            <textarea className={styles.taskTextarea} value={comments}></textarea>
                        </label>

                        <label className={styles.taskLabel}>
                            Projeto Associado:
                            <input type="text" className={styles.taskInput} value={associatedProject} />
                        </label>

                        <ul className={styles.taskList}>
                            {subtasks.map((subtask: string) => <li className={styles.taskListItem} key={subtask}>{subtask}</li>)}
                        </ul>

                        <label className={styles.taskLabel}>
                            Anexos:
                            <input type="file" className={styles.taskInput} multiple />
                        </label>

                        <label className={styles.taskLabel}>
                            Tags/Categorias:
                            <input type="text" className={styles.taskInput} />
                        </label>

                        <div className={styles.taskHistory}>
                            <h4>Histórico de Atualizações:</h4>
                            <ul>
                                {updateHistory.map((update: string) => <li key={update}>{update}</li>)}
                            </ul>
                        </div>

                    </>
                )
            }

            <button onClick={toggleDetails}>
                {showDetails ? 'Ver Menos' : 'Ver Mais'}
            </button>

        </div>
    );
};

export default Task;
