import moment from "moment";
import timezone from "moment-timezone";
import { NextPage } from "next";
import { Task } from "../types/Task";

type ItemProps ={
    task: Task,
    selecionarTarefa(t:Task):void
}

export const Item: NextPage<ItemProps> = ({task, selecionarTarefa}) => {
    const isTaskFinished = task.finishDate || false;

    const getDateText = (finishDate : string | undefined, finishPrevisionDate : string) => {
        if(finishDate){
            return `Concluído em: ${moment(timezone.tz(finishDate, "UTC-03:00")).format('DD/MM/yyyy')}`;
        }
        return `Conclusão em: ${moment(timezone.tz(finishPrevisionDate, "UTC-03:00")).format('DD/MM/yyyy')}`;
    }

    return (
        <div className={"container-item"+ (isTaskFinished ? '' : ' active')}
            onClick={e => isTaskFinished ? null : selecionarTarefa(task)}>
            <img src={isTaskFinished ? '/checked.svg' : 'unchecked.svg'}
                alt={isTaskFinished ? 'Tarefa concluída' : 'Tarefa não concluída'}/>
            <div>
                <p className={isTaskFinished ? 'finished' : ''}>{task.name}</p>
                <span>{getDateText(task.finishDate, task.finishPrevisionDate)}</span>
            </div>
        </div>
    )
}