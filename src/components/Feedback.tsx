import React, { FC } from 'react'
import { GuessResult } from '@/types'

interface FeedbackProps {
  result?: GuessResult
}

const Feedback: FC<FeedbackProps> = ({ result }) => {
  if (!result) return null

  const messages: Record<GuessResult, string> = {
    high: 'Too high!',
    low: 'Too low!',
    correct: 'Correct!',
  }

  return <div className={`feedback feedback-${result}`}>{messages[result]}</div>
}

export default Feedback