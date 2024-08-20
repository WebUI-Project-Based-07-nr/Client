import { AxiosResponse } from 'axios'

let mockQuizzes = [
  {
    _id: '1',
    name: 'Quiz 1',
    category: 'Math',
    description: 'Description 1',
    updatedAt: '2024-08-08T14:30:00Z'
  },
  {
    _id: '2',
    name: 'Quiz 2',
    category: 'Science',
    description: 'Description 2',
    updatedAt: '2024-08-07T14:30:00Z'
  }
]

export const QuizServiceMock = {
  getQuizzes: (): Promise<
    AxiosResponse<{ count: number; items: typeof mockQuizzes }>
  > => {
    return Promise.resolve({
      data: {
        count: mockQuizzes.length,
        items: mockQuizzes
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: {} }
    })
  },
  deleteQuiz: (id: string) => {
    mockQuizzes = mockQuizzes.filter((el) => el._id !== id)
  },
  createMockedQuiz: (newQuiz: {
    name: string
    category: string
    description: string
  }) => {
    const quiz = {
      _id: (mockQuizzes.length + 1).toString(),
      name: newQuiz.name,
      category: newQuiz.category || 'General',
      description: newQuiz.description,
      updatedAt: new Date().toISOString()
    }
    mockQuizzes = [quiz, ...mockQuizzes]
  }
}
