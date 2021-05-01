import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import AuthRoute from './util/AuthRoute';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={SinglePost} />
          <Route exact path='/' component={Home} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
