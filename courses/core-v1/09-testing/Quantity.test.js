import * as React from 'react'
import Quantity from './Quantity'

/**
 * With React Testing Library
 * See: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
 */

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('Quantity', () => {
  it('should start with 0', () => {
    render(<Quantity />)
    const quantity = screen.getByTestId('quantity')
    expect(quantity.value).toEqual('0')
  })

  it('should not allow subtraction when quantity is already 0', () => {
    render(<Quantity />)
    const quantity = screen.getByTestId('quantity')
    const subtract = screen.getByTestId('subtract-button')
    expect(quantity.value).toEqual('0')
    fireEvent.click(subtract)
    expect(quantity.value).toEqual('0')
  })

  it('should add', () => {
    render(<Quantity />)
    const quantity = screen.getByTestId('quantity')
    const add = screen.getByTestId('add-button')
    fireEvent.click(add)
    expect(quantity.value).toEqual('1')
  })

  it('should subtract', () => {
    render(<Quantity />)
    const quantity = screen.getByTestId('quantity')
    const add = screen.getByTestId('add-button')
    const subtract = screen.getByTestId('subtract-button')
    // Since this component is uncontrolled and always starts at 0,
    // we'll add first to test subtract
    fireEvent.click(add)
    fireEvent.click(subtract)
    expect(quantity.value).toEqual('0')
  })

  it('should add (up arrow)', () => {
    render(<Quantity />)
    const quantity = screen.getByTestId('quantity')
    fireEvent.keyDown(quantity, { key: 'ArrowUp' })
    expect(quantity.value).toEqual('1')
  })

  it('should subtract (down arrow)', () => {
    render(<Quantity />)
    const quantity = screen.getByTestId('quantity')
    fireEvent.keyDown(quantity, { key: 'ArrowUp' })
    fireEvent.keyDown(quantity, { key: 'ArrowDown' })
    expect(quantity.value).toEqual('0')
  })
})

/**
 * The same tests with React Test-Utils
 */

import * as ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'

describe('Quantity', () => {
  let container
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container = null
  })

  it('should start with 0', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const input = container.querySelector('[data-testid="quantity"]')
    expect(input.value).toBe('0')
  })

  it('should not allow subtraction when quantity is 0', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const subtractButton = container.querySelector('[data-testid=subtract-button]')
    const input = container.querySelector('[data-testid="quantity"]')
    expect(input.value).toBe('0')
    act(() => {
      subtractButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('0')
  })

  it('should add', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const addButton = container.querySelector('[data-testid=add-button]')
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('1')
  })

  it('should subtract', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const subtractButton = container.querySelector('[data-testid=subtract-button]')
    const addButton = container.querySelector('[data-testid=add-button]')
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      addButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    act(() => {
      subtractButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(input.value).toBe('0')
  })

  it('should add (up arrow)', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
        })
      )
    })
    expect(input.value).toBe('1')
  })

  it('should add (down arrow)', () => {
    act(() => {
      ReactDOM.render(<Quantity />, container)
    })
    const input = container.querySelector('[data-testid="quantity"]')
    act(() => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
          bubbles: true,
        })
      )
    })
    act(() => {
      input.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
          bubbles: true,
        })
      )
    })
    expect(input.value).toBe('0')
  })
})
