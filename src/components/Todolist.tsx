import { type ChangeEvent } from "react"
import type { FilterValuesType } from "../App"
import { AddItemForm } from "./AddItemForm"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todolistsId: string) => void
    changeFilter: (value: FilterValuesType, todolistsId: string) => void
    addTask: (title: string, todolistsId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistsId: string) => void
    removeTodolist: (todolistsId: string) => void
}

export const Todolist = (props: PropsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => props.removeTodolist(props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onRemoveHandler = () => props.removeTask(t.id, props.id)
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            return (
                                <li key={t.id} className={t.isDone === true ? "is-done" : undefined}>
                                    <input type='checkbox' checked={t.isDone} onChange={onChangeHandler} />
                                    <span>{t.title}</span>
                                    <button onClick={onRemoveHandler}>x</button>
                                </li>)
                        })}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>all</button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>active</button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>completed</button>
                </div>
            </div>
        </div>
    )
}

