import './App.css'
import { AppRouter } from './routes/AppRouter'
import { GlobalLoading } from './components/GlobalLoading/GlobalLoading'; 
function App() {
  return (
    <>
      <GlobalLoading />
      <AppRouter />


    </>
  )
}

export default App
