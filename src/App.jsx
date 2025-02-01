import './App.css'
import Search from './components/Search/Search'
import CustomRoutes from './routes/CustomRoutes'
import {Link} from 'react-router-dom';

function App() {
  return (
    <>
      <Link to="/">
        <h1>PokeDex</h1>
      </Link>
      <CustomRoutes/>
    </>
  )
}

export default App
