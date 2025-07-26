import React, { FC, ChangeEvent, FormEvent, useState } from 'react'
import { MIN_NUMBER, MAX_NUMBER } from '@/constants'

interface GuessInputProps {
  onGuess: (guess: number) => void
  disabled?: boolean
}

const GuessInput: FC<GuessInputProps> = ({ onGuess, disabled = false }) => {
  const [guess, setGuess] = useState<number>(MIN_NUMBER)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10)
    if (isNaN(value)) {
      value = MIN_NUMBER
    }
    value = Math.max(MIN_NUMBER, Math.min(value, MAX_NUMBER))
    setGuess(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onGuess(guess)
    setGuess(MIN_NUMBER)
  }

  return (
    <form className="guess-input" onSubmit={handleSubmit}>
      <label htmlFor="guess-input-field">
        Enter your guess between {MIN_NUMBER} and {MAX_NUMBER}:
      </label>
      <input
        id="guess-input-field"
        type="number"
        value={guess}
        onChange={handleChange}
        min={MIN_NUMBER}
        max={MAX_NUMBER}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>
        Guess
      </button>
    </form>
  )
}

export default GuessInput
