//Routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Components
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

//Styles
import { GlobalStyle } from './GlobalStyle';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:movieId' element={<Movie />} /> {/* dynamic routers */}
        <Route path='/*' element={<NotFound />} /> {/* Any other route */}
      </Routes>
      <GlobalStyle />
    </Router>
  );
}

export default App;
