import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Books from './pages/Books';
import { ROUTES } from './lib/constants/routes';
import Logout from './pages/Logout';
import Users from './pages/Users';
import ChangePassword from './pages/ChangePassword';
import Accounts from './pages/Accounts';
import AccountUsers from './pages/Accounts/AccountUsers';

function App() {
  return (
    <>
      <Routes>
        <Route path={ROUTES.home.path} element={<Home/>} />
        <Route path={ROUTES.login.path} element={<Login/>} />
        <Route path={ROUTES.signup.path} element={<SignUp/>} />
        <Route path={ROUTES.books.path} element={<Books/>} />
        <Route path={ROUTES.logout.path} element={<Logout/>} />
        <Route path={ROUTES.users.path} element={<Users/>} />
        <Route path={ROUTES.changepassword.path} element={<ChangePassword/>} />
        <Route path={ROUTES.accounts.path} element={<Accounts/>} />
        <Route path={ROUTES.accountUsers.path} element={<AccountUsers/>} />
      </Routes>
    </>
  )
}

export default App
