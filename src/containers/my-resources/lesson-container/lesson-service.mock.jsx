let mockLessons = [
  {
    _id: '1',
    name: 'Lesson 1',
    category: 'Math',
    description: 'Description 1',
    updatedAt: '2024-08-08T14:30:00Z'
  },
  {
    _id: '2',
    name: 'Lesson 2',
    category: 'Science',
    description: 'Description 2',
    updatedAt: '2024-08-07T14:30:00Z'
  },
  {
    _id: '3',
    name: 'Lesson 3',
    category: 'History',
    description: 'Description 3',
    updatedAt: '2024-08-08T14:30:00Z'
  },
  {
    _id: '4',
    name: 'Lesson 4',
    category: 'Math',
    description: 'Description 4',
    updatedAt: '2024-08-08T14:30:00Z'
  },
  {
    _id: '5',
    name: 'Lesson 5',
    category: 'Science',
    description: 'Description 5',
    updatedAt: '2024-08-07T14:30:00Z'
  },
  {
    _id: '6',
    name: 'Lesson 6',
    category: 'History',
    description: 'Description 6',
    updatedAt: '2024-08-06T14:30:00Z'
  }
]

export const ResourceServiceMock = {
  getLessons: () => {
    return Promise.resolve({
      data: {
        count: mockLessons.length,
        items: mockLessons
      }
    })
  },
  deleteLesson: (id) => {
    return (mockLessons = mockLessons.filter((el) => el._id !== id))
  }
}
