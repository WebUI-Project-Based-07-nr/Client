import { Lesson } from '~/types/my-resources/types/lesson.types'

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Lesson 1',
    description: 'Description for Lesson 1'
  },
  {
    id: '2',
    title: 'Lesson 2',
    description: 'Description for Lesson 2'
  },
  {
    id: '3',
    title: 'Lesson 3',
    description: 'Description for Lesson 3'
  },
  {
    id: '4',
    title: 'Lesson 4',
    description: 'Description for Lesson 4'
  }
]

export const ResourceServiceMock = {
  getLessons: async (): Promise<Lesson[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(lessons), 1000))
  },
  getLesson: async (id: string): Promise<Lesson | null> => {
    const lesson = lessons.find((lesson) => lesson.id === id)
    return new Promise((resolve) =>
      setTimeout(() => resolve(lesson || null), 500)
    )
  }
}
