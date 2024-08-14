export const authRoutes = {
  categories: { route: 'categories', path: '/categories' },
  subjects: { route: 'categories/subjects', path: '/categories/subjects' },
  findOffers: {
    route: 'categories/subjects/find-offers',
    path: '/categories/subjects/find-offers'
  },
  userProfile: { route: 'user/:id', path: '/user' },
  myResources: {
    root: { route: 'my-resources', path: '/my-resources' },
    lessons: { route: 'lessons', path: '/lessons' },
    lessonDetail: { route: 'lesson/:lessonId', path: '/lesson/:lessonId' },
    createOrEditLesson: {
      route: 'edit-lesson/:lessonId',
      path: '/edit-lesson/:lessonId'
    },
    newLesson: {
      route: 'my-resources/new-lesson',
      path: '/my-resources/new-lesson'
    },
    newQuestion: {
      route: 'my-resources/new-question',
      path: '/my-resources/new-question'
    },
    editQuestion: {
      route: 'my-resources/edit-question/:id',
      path: '/my-resources/edit-question'
    },
    quizzes: {
      root: { route: 'quizzes', path: '/quizzes' },
      detail: { route: 'quiz/:quizId', path: '/quiz/:quizId' },
      edit: { route: 'edit-quiz/:quizId', path: '/edit-quiz/:quizId' }
    }
  },
  accountMenu: {
    myProfile: { route: 'my-profile', path: '/my-profile' },
    logout: { route: 'logout', path: '/logout' }
  }
}
