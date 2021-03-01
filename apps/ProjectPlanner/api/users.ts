import { post, get } from '../utils'
import { getBoards, removeBoard, createBoard, createTaskGroup, createTask } from './boards'
import * as storage from '../localStorage'
import { User } from '../types'

type DatabaseUser = User & { password?: string }

export async function registerUser(user: Omit<User, 'id' | 'accountId'>): Promise<User> {
  const newUser = await post<DatabaseUser>(`/users`, user)

  // Log them in (which we fake with localStorage)
  delete newUser.password
  storage.login(newUser)

  return newUser
}

export async function getAccountUsers(): Promise<User[]> {
  return get<DatabaseUser[]>(`/users`).then((users) =>
    users.map((u) => {
      delete u.password
      return u
    })
  )
}

export async function getUser(userId: number): Promise<User> {
  return get<DatabaseUser>(`/users/${userId}`).then((user) => {
    delete user.password
    return user
  })
}

export async function getUsersByIds(ids: number[]): Promise<User[]> {
  if (ids.length === 0) return Promise.resolve([])
  return get<DatabaseUser[]>(`/users?id=${ids.join('&id=')}`).then((users) =>
    users.map((u) => {
      delete u.password
      return u
    })
  )
}

/**
 * Seed an new account with data
 */

export async function resetAccountBoardData(userId: number) {
  try {
    const boards = await getBoards()

    await Promise.all(
      boards.map((board) => {
        return removeBoard(board.id)
      })
    )

    const board = await createBoard('React Workshop')

    function u(a: number[]): number[] {
      return [...new Set(a)]
    }

    const tg1 = await createTaskGroup(board.id, 'Getting Setup')
    await createTask(board.id, tg1.id, {
      name: 'JS Primer Article',
      content: 'Remember to read: https://reacttraining.com/blog/javascript-the-react-parts/',
      minutes: 10,
      completedMinutes: 10,
      assignedTo: u([userId, 1, 3]),
    })
    await createTask(board.id, tg1.id, {
      name: 'Install Workshop Code',
      content: 'git clone and npm install',
      minutes: 5,
      completedMinutes: 5,
      assignedTo: u([userId, 2, 3]),
    })

    const tg2 = await createTaskGroup(board.id, 'Thinking in React')
    await createTask(board.id, tg2.id, {
      name: 'Declarative vs Imperative',
      content:
        'Declarative code is when you write in a style where you say "what" you want, like HTML, CSS, SQL, or React\'s JSX. Imperative code is when you write in a style where you say "how" you want things to work.',
      minutes: 60,
      assignedTo: u([userId, 7]),
    })
    await createTask(board.id, tg2.id, {
      name: 'Creating State',
      content: 'State can be created with useState or useReducer',
      minutes: 60,
      assignedTo: [3, 6, 7],
    })
    await createTask(board.id, tg2.id, {
      name: 'Updating State',
      content: 'Updating state will cause a re-render of the component',
      minutes: 10,
      completedMinutes: 5,
      assignedTo: u([userId, 2, 8]),
    })

    const tg3 = await createTaskGroup(board.id, 'Terminology')
    await createTask(board.id, tg3.id, {
      name: 'React Component',
      content:
        'React components are created with functions or classes. With functions, they return JSX. With classes, the `render` method returns JSX',
      minutes: 10,
      completedMinutes: 5,
      assignedTo: [7, 8],
    })
    await createTask(board.id, tg3.id, {
      name: 'SPA',
      content:
        'A "Single Page Application" is where the HTML payload is only delivered on the first request. Then JavaScript mimics page changes and updates the URL as the user navigates. The DOM is also changed between pages giving an impression of real page changes.',
      minutes: 10,
      completedMinutes: 10,
      assignedTo: [4, 5, 6],
    })
  } catch (err) {
    console.log('Error Creating User Data', err)
  }
}
