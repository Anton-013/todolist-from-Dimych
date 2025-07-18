import { useState } from 'react'
import './App.css'
import { v1 } from 'uuid'
import { Todolist, type TaskType } from './components/Todolist'
import { AddItemForm } from './components/AddItemForm'

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function removeTask(id: string, todolistsId: string) {
    let tasks = tasksObj[todolistsId]
    let filteredTasks = tasks.filter(t => t.id !== id)
    tasksObj[todolistsId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistsId: string) {
    let task = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistsId]
    let newTasks = [task, ...tasks]
    tasksObj[todolistsId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeStatus(taskId: string, isDone: boolean, todolistsId: string) {
    let tasks = tasksObj[todolistsId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }

  }

  function changeTaskTitle(taskId: string, newTitle: string, todolistsId: string) {
    let tasks = tasksObj[todolistsId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle
      setTasks({ ...tasksObj })
    }

  }

  function changeFilter(value: FilterValuesType, todolistsId: string) {
    let todolist = todolists.find(tl => tl.id === todolistsId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'active' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  let removeTodolist = (todolistsId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistsId)
    setTodolists(filteredTodolist)
    delete tasksObj[todolistsId]
    setTasks({ ...tasksObj })
  }

  function changeTodolistTitle (id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

  let [tasksObj, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Beer', isDone: false },
    ]
  })

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      title,
      filter: 'all',
    }
    setTodolists([todolist, ...todolists])
    setTasks({ ...tasksObj, [todolist.id]: [] })
  }

  return (
    <>
      <AddItemForm addItem={addTodolist} />
      {
        todolists.map((tl) => {
          let tasksForTodolist = tasksObj[tl.id]

          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
          }
          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
          }
          return (
            <Todolist
              key={tl.id}
              id={tl.id}
              title={tl.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={tl.filter}
              removeTodolist={removeTodolist}
              changeTodolistTitle={changeTodolistTitle}
              changeTaskTitle={changeTaskTitle} />
          )
        })
      }
    </>
  )
}

export default App
