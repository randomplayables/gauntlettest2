import React, { FC } from 'react'
import { GuessResult } from '@/types'

interface GuessHistoryProps {
  history: { guess: number; result: GuessResult }[]
}

const feedbackMessages: Record<GuessResult, string> = {
  high: 'Too high!',
  low: 'Too low!',
  correct: 'Correct!',
}

const GuessHistory: FC<GuessHistoryProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return null
  }

  return (
    <div className="guess-history">
      <h2>Guess History</h2>
      <ul className="guess-history-list">
        {history.map((entry, index) => (
          <li key={index} className={`guess-history-item guess-${entry.result}`}>
            <span className="guess-number">Guess {index + 1}: {entry.guess}</span>
            <span className="guess-result">{feedbackMessages[entry.result]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GuessHistory