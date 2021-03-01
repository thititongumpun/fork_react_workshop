import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { TaskDialog } from './TaskDialog'
import { TaskCard } from './TaskCard'
import { getTheme } from '../lecture/utils'
// import { ThemeProvider } from './ThemeContext'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

type Colors = {
  [key: string]: string
}
export const ThemeContext = React.createContext<Colors | null>(null)

const App: React.FC = () => {
  const colors = getTheme()

  return (
    <ThemeContext.Provider value={colors}>
      <PrimaryLayout />
    </ThemeContext.Provider>
  )
}

const PrimaryLayout: React.FC = () => {
  return <Board />
}

const Board: React.FC = () => {
  return <TaskGroup />
}

const TaskGroup: React.FC = () => {
  const [expandTask, setExpandTask] = useState(false)

  // Instead of TaskDialog and TaskGroup each doing their own network
  // requests and operating on their own state, here we have some lifted
  // state that they will each use. Let's just have each component work
  // with this state and forget about network requests for this context
  // exercise:
  const [task, setTask] = useState({
    name: 'Context',
    content: 'Learn about React Context',
    minutes: 0,
    completedMinutes: 0,
  })

  function update(partialTask: Partial<Task>) {
    setTask({ ...task, ...partialTask })
  }

  return (
    <div>
      {expandTask && (
        <TaskDialog task={task} update={update} onClose={() => setExpandTask(false)} />
      )}
      <TaskCard task={task} onClick={() => setExpandTask(true)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export type Task = {
  name: string
  content: string
  minutes: number
  completedMinutes: number
}
