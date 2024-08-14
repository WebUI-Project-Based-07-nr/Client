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
  newLesson: (title, description) => {
    const newLesson = {
      _id: (mockLessons.length + 1).toString(),
      name: title,
      category: 'Uncategorized',
      description: description,
      updatedAt: new Date().toISOString()
    }
    return mockLessons.push(newLesson)
  },
  getLesson: (id) => {
    return mockLessons.filter((el) => el._id === id)[0]
  },
  editLesson: (title, description, id) => {
    return (mockLessons = mockLessons.map((el) => {
      if (el._id === id) {
        el.name = title
        el.description = description
        el.updatedAt = new Date().toISOString()
      }
      return el
    }))
  },
  deleteLesson: (id) => {
    return (mockLessons = mockLessons.filter((el) => el._id !== id))
  }
}
