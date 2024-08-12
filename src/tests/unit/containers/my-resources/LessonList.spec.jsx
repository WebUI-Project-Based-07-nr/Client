import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import { ResourceServiceMock as ResourceService } from '~/containers/my-resources/lesson-list/resource-service.mock'
import LessonList from '~/containers/my-resources/lesson-list/LessonList'
import '@testing-library/jest-dom'

vi.mock('~/containers/my-resources/lesson-list/resource-service.mock')

describe('LessonList', () => {
  it('displays the loader initially', () => {
    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <Routes>
          <Route element={<LessonList />} path='/lessons' />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('displays the list of lessons after fetching', async () => {
    const lessons = [
      { id: '1', title: 'Lesson 1', description: 'Description for Lesson 1' },
      { id: '2', title: 'Lesson 2', description: 'Description for Lesson 2' }
    ]
    ResourceService.getLessons.mockResolvedValueOnce(lessons)

    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <Routes>
          <Route element={<LessonList />} path='/lessons' />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lesson 1')).toBeInTheDocument()
      expect(screen.getByText('Lesson 2')).toBeInTheDocument()
    })
  })

  it('redirects to the lesson detail page when clicking a title', async () => {
    const lessons = [
      { id: '1', title: 'Lesson 1', description: 'Description for Lesson 1' },
      { id: '2', title: 'Lesson 2', description: 'Description for Lesson 2' }
    ]
    ResourceService.getLessons.mockResolvedValueOnce(lessons)

    render(
      <MemoryRouter initialEntries={['/lessons']}>
        <Routes>
          <Route element={<LessonList />} path='/lessons' />
          <Route
            element={<div>Lesson Detail Page</div>}
            path='/lesson/:lessonId'
          />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lesson 1')).toBeInTheDocument()
    })

    screen.getByText('Lesson 1').click()

    await waitFor(() => {
      expect(screen.getByText('Lesson Detail Page')).toBeInTheDocument()
    })
  })
})
