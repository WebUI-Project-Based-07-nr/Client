import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import QuizList from '~/containers/my-resources/quiz-container/QuizList'
import { vi } from 'vitest'

vi.mock('~/containers/my-resources/quiz-detail/quiz-service.mock', () => ({
  QuizServiceMock: {
    getQuizzes: vi.fn().mockResolvedValue([
      { _id: '1', title: 'Quiz 1', description: 'Description for Quiz 1' },
      { _id: '2', title: 'Quiz 2', description: 'Description for Quiz 2' }
    ])
  }
}))

test('renders quiz titles and links to quiz details', async () => {
  render(
    <Router>
      <QuizList />
    </Router>
  )

  const quizLink1 = await screen.findByText('Quiz 1')
  const quizLink2 = await screen.findByText('Quiz 2')

  expect(quizLink1.closest('a')).toHaveAttribute('href', '/quiz/1')
  expect(quizLink2.closest('a')).toHaveAttribute('href', '/quiz/2')
})
