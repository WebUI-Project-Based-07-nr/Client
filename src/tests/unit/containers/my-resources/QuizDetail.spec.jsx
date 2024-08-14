import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import QuizDetail from '~/containers/my-resources/quiz-detail/QuizDetail'
import { vi } from 'vitest'

vi.mock('~/containers/my-resources/quiz-detail/quiz-service.mock', () => ({
  QuizServiceMock: {
    getQuiz: vi.fn().mockResolvedValue({
      _id: '1',
      title: 'Quiz 1',
      description: 'Description for Quiz 1'
    })
  }
}))

test('renders quiz details and link to edit quiz', async () => {
  render(
    <MemoryRouter initialEntries={['/quiz/1']}>
      <Routes>
        <Route element={<QuizDetail />} path='/quiz/:quizId' />
        <Route element={<div>Edit Quiz</div>} path='/edit-quiz/:quizId' />
      </Routes>
    </MemoryRouter>
  )

  await waitFor(() => {
    screen.debug()
  })

  const quizTitle = await screen.findByText('Quiz 1')
  const quizDescription = await screen.findByText('Description for Quiz 1')

  expect(quizTitle).toBeInTheDocument()
  expect(quizDescription).toBeInTheDocument()

  const editLink = screen.getByText('Quiz 1').closest('a')
  expect(editLink).toHaveAttribute('href', '/edit-quiz/1')
})
