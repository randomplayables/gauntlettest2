import React, { FC, ChangeEvent, FormEvent, useState } from 'react'
import { MIN_NUMBER, MAX_NUMBER } from '@/constants'

interface NumberSelectorProps {
  onSelect: (selectedNumber: number) => void
}

const NumberSelector: FC<NumberSelectorProps> = ({ onSelect }) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(MIN_NUMBER)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    let numericValue = parseInt(inputValue, 10)
    if (isNaN(numericValue)) {
      numericValue = MIN_NUMBER
    }
    numericValue = Math.max(MIN_NUMBER, Math.min(numericValue, MAX_NUMBER))
    setSelectedNumber(numericValue)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSelect(selectedNumber)
  }

  return (
    <form className="number-selector" onSubmit={handleSubmit}>
      <label htmlFor="number-selector-input">
        Choose a secret number between {MIN_NUMBER} and {MAX_NUMBER}:
      </label>
      <input
        id="number-selector-input"
        type="number"
        value={selectedNumber}
        min={MIN_NUMBER}
        max={MAX_NUMBER}
        onChange={handleChange}
      />
      <button type="submit">Set Number</button>
    </form>
  )
}

export default NumberSelector
