import { Category, Quiz } from '~/types'

const quizzes: Quiz[] = [
  {
    _id: '1',
    title: 'Quiz 1',
    description: 'Description for Quiz 1',
    category: { _id: '1', name: 'Category 1' } as Category,
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Quiz 2',
    description: 'Description for Quiz 2',
    category: { _id: '2', name: 'Category 2' } as Category,
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export const QuizServiceMock = {
  getQuizzes: async (): Promise<Quiz[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(quizzes), 1000))
  },
  getQuiz: async (id: string): Promise<Quiz | null> => {
    const quiz = quizzes.find((quiz) => quiz._id === id)
    return new Promise((resolve) =>
      setTimeout(() => resolve(quiz || null), 500)
    )
  }
}
