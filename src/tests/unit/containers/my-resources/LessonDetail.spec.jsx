import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import { ResourceServiceMock as ResourceService } from '~/containers/my-resources/lesson-list/resource-service.mock'
import LessonDetail from '~/containers/my-resources/lesson-detail/LessonDetail'
import '@testing-library/jest-dom'

vi.mock('~/containers/my-resources/lesson-list/resource-service.mock')

describe('LessonDetail', () => {
  it('displays the loader initially', () => {
    render(
      <MemoryRouter initialEntries={['/lesson/1']}>
        <Routes>
          <Route element={<LessonDetail />} path='/lesson/:lessonId' />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('displays the lesson details after fetching', async () => {
    const lesson = {
      id: '1',
      title: 'Lesson 1',
      description: 'Description for Lesson 1'
    }
    ResourceService.getLesson.mockResolvedValueOnce(lesson)

    render(
      <MemoryRouter initialEntries={['/lesson/1']}>
        <Routes>
          <Route element={<LessonDetail />} path='/lesson/:lessonId' />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lesson 1')).toBeInTheDocument()
      expect(screen.getByText('Description for Lesson 1')).toBeInTheDocument()
    })
  })

  it('redirects to the edit page when clicking the title', async () => {
    const lesson = {
      id: '1',
      title: 'Lesson 1',
      description: 'Description for Lesson 1'
    }
    ResourceService.getLesson.mockResolvedValueOnce(lesson)

    render(
      <MemoryRouter initialEntries={['/lesson/1']}>
        <Routes>
          <Route element={<LessonDetail />} path='/lesson/:lessonId' />
          <Route element={<div>Edit Page</div>} path='/edit-lesson/:lessonId' />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Lesson 1')).toBeInTheDocument()
    })

    screen.getByText('Lesson 1').click()

    await waitFor(() => {
      expect(screen.getByText('Edit Page')).toBeInTheDocument()
    })
  })
})
