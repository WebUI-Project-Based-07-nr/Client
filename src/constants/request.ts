export const URLs = {
  example: {
    get: '/example'
  },
  auth: {
    login: '/auth/login',
    googleAuth: '/auth/google-auth',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    confirm: '/auth/confirm-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  users: {
    get: '/users',
    getImage: '/users/image',
    update: '/users',
    delete: '/users/delete',
    myProfile: '/users/myProfile',
    myImage: '/users/image'
  },
  categories: {
    get: '/categories',
    getNames: '/categories/names',
    priceRange: '/price-range'
  },
  subjects: {
    get: '/subjects',
    getNames: '/subjects/names'
  },
  resources: {
    questions: {
      get: '/questions',
      delete: '/questions',
      post: '/questions',
      patch: '/questions'
    },
    resourcesCategories: {
      get: '/resources-categories',
      getNames: '/resources-categories/names',
      patch: '/resources-categories',
      post: '/resources-categories',
      delete: 'resources-categories'
    },
    quizzes: {
      get: '/quizzes',
      delete: '/quizzes',
      post: '/quizzes',
      patch: '/quizzes'
    }
  },
  offers: {
    get: '/offers',
    delete: '/offers',
    post: '/offers',
    patch: '/offers'
  },
  location: {
    countries: {
      get: '/location/countries'
    },
    cities: {
      get: '/location/cities'
    }
  }
}
