import { type ChangeEvent } from "react"
import type { FilterValuesType } from "../App"
import { AddItemForm } from "./AddItemForm"
import { EditadleSpan } from "./EditadleSpan"

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
    changeTaskTitle: (taskId: string, newTitle: string, todolistsId: string) => void
    removeTodolist: (todolistsId: string) => void
    changeTodolistTitle: (taskId: string, newTitle: string) => void
}

export const Todolist = (props: PropsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>
                <EditadleSpan title={props.title} onChange={changeTodolistTitle} />
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onRemoveHandler = () => props.removeTask(t.id, props.id)
                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(t.id, newValue, props.id)
                            }
                            return (
                                <li key={t.id} className={t.isDone === true ? "is-done" : undefined}>
                                    <input type='checkbox' checked={t.isDone} onChange={onChangeStatusHandler} />
                                    <EditadleSpan title={t.title} onChange={onChangeTitleHandler} />
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


