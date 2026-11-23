import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ExamInfo from './pages/ExamInfo'
import Register from './pages/Register'
import StudyIndex from './pages/StudyIndex'
import Part1Study from './pages/Part1Study'
import Part2Study from './pages/Part2Study'
import Part3Study from './pages/Part3Study'
import Part4Study from './pages/Part4Study'
import Part5Study from './pages/Part5Study'
import Flashcards from './pages/Flashcards'
import PracticeHome from './pages/PracticeHome'
import PracticeRun from './pages/PracticeRun'
import Shadow from './pages/Shadow'
import Stats from './pages/Stats'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="exam" element={<ExamInfo />} />
        <Route path="register" element={<Register />} />
        <Route path="study" element={<StudyIndex />} />
        <Route path="study/part1" element={<Part1Study />} />
        <Route path="study/part2" element={<Part2Study />} />
        <Route path="study/part3" element={<Part3Study />} />
        <Route path="study/part4" element={<Part4Study />} />
        <Route path="study/part5" element={<Part5Study />} />
        <Route path="study/cards" element={<Flashcards />} />
        <Route path="study/shadow" element={<Shadow />} />
        <Route path="stats" element={<Stats />} />
        <Route path="practice" element={<PracticeHome />} />
        <Route path="practice/run/:mode" element={<PracticeRoute />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

/** 문제 주소가 바뀌면 진행 상태를 새로 시작 */
function PracticeRoute() {
  const { pathname, search } = useLocation()
  return <PracticeRun key={pathname + search} />
}
