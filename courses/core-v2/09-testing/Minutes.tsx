import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

type Props = {
  minutes: number
  min?: number
  onChange(minutes: number): void
}

export const Minutes: React.FC<Props> = ({ minutes, min = 0, onChange }) => {
  function subtract() {
    if (minutes > min) {
      onChange(minutes - 1)
    }
  }

  function add() {
    onChange(minutes + 1)
  }

  function handleChange(value: string) {
    const int = parseInt(value, 10)
    // disallow non-numeric values
    if (!isNaN(int)) {
      onChange(int)
    }
  }

  function handleInputBlur(event: any) {
    if (event.target.value.trim() === '') {
      onChange(0)
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      add()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      subtract()
    }
  }

  return (
    <div className="minutes">
      <div>
        <button type="button" onClick={subtract} data-testid="subtract-button">
          <FaMinusCircle />
        </button>
      </div>

      <input
        className="form-field"
        type="text"
        aria-label="quantity"
        value={minutes}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        data-testid="minutes-input"
      />

      <div>
        <button type="button" onClick={add} data-testid="add-button">
          <FaPlusCircle />
        </button>
      </div>
    </div>
  )
}
