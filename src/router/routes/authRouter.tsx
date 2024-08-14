import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { authRoutes } from '~/router/constants/authRoutes'
import {
  categories,
  subjects,
  myProfile,
  myResources,
  userProfile,
  newQuestion,
  editQuestion,
  findOffers,
  newLesson
} from '~/router/constants/crumbs'
import PrivateRoute from '~/router/helpers/PrivateRoute'
import { UserRoleEnum } from '~/types'
import { userProfileLoader } from '../constants/loaders'
import LessonDetail from '~/containers/my-resources/lesson-detail/LessonDetail'
import LessonContainer from '~/containers/my-resources/lesson-container/LessonsContainer'
import QuizDetail from '~/containers/my-resources/quiz-detail/QuizDetail'


const Categories = lazy(() => import('~/pages/categories/Categories'))
const Subjects = lazy(() => import('~/pages/subjects/Subjects'))
const FindOffers = lazy(() => import('~/pages/find-offers/FindOffers'))
const TutorProfile = lazy(() => import('~/pages/tutor-profile/TutorProfile'))
const MyResources = lazy(() => import('~/pages/my-resources/MyResources'))
const CreateNewLesson = lazy(
  () => import('~/pages/createNewLesson/CreateNewLesson')
)
const CreateOrEditQuestion = lazy(
  () => import('~/pages/create-or-edit-question/CreateOrEditQuestion')
)

export const authRouter = (
  <Route
    element={<PrivateRoute role={[UserRoleEnum.Student, UserRoleEnum.Tutor]} />}
  >
    <Route
      element={<Categories />}
      handle={{ crumb: categories }}
      path={authRoutes.categories.route}
    />
    <Route
      element={<Subjects />}
      handle={{ crumb: [categories, subjects] }}
      path={authRoutes.subjects.route}
    />
    <Route
      element={<FindOffers />}
      handle={{ crumb: findOffers }}
      path={authRoutes.findOffers.route}
    />
    <Route
      element={<TutorProfile />}
      handle={{ crumb: userProfile }}
      loader={userProfileLoader}
      path={authRoutes.userProfile.route}
    />
    <Route
      element={<TutorProfile />}
      handle={{ crumb: myProfile }}
      path={authRoutes.accountMenu.myProfile.route}
    />
    <Route
      element={<MyResources />}
      handle={{ crumb: myResources }}
      path={authRoutes.myResources.root.route}
    />
    <Route
      element={<CreateOrEditQuestion />}
      handle={{ crumb: [myResources, newQuestion] }}
      path={authRoutes.myResources.newQuestion.route}
    />
    <Route
      element={<CreateNewLesson />}
      handle={{ crumb: [myResources, newLesson] }}
      path={authRoutes.myResources.newLesson.route}
    />
    <Route
      element={<CreateOrEditQuestion />}
      handle={{ crumb: [myResources, editQuestion] }}
      path={authRoutes.myResources.editQuestion.route}
    />
    <Route
      element={<LessonContainer />}
      handle={{ crumb: myResources }}
      path={authRoutes.myResources.lessons.route}
    />
    <Route
      element={<LessonDetail />}
      handle={{ crumb: myResources }}
      path={authRoutes.myResources.lessonDetail.route}
    />
    <Route
      element={<CreateNewLesson />}
      handle={{ crumb: [myResources, newLesson] }}
      path={authRoutes.myResources.createOrEditLesson.path}
    />
    <Route
      element={<QuizDetail />}
      handle={{ crumb: myResources }}
      path={authRoutes.myResources.quizzes.detail.path}
    />
    <Route
      element={<CreateOrEditQuestion />}
      handle={{ crumb: [myResources, editQuestion] }}
      path={authRoutes.myResources.quizzes.edit.path}
    />
  </Route>
)
