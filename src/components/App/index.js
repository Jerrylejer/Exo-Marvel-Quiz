import { Routes, Route } from 'react-router-dom';
import '../../index.css';
import Header from '../Header/index';
import Landing from '../Landing';
import Footer from '../Footer';
import Member from '../Member';
import Login from '../Login';
import SignUp from '../SignUp';
import Page404 from '../Page404';
import ForgetPassword from '../ForgetPassword/index';

function App() {
    return (
        <h1>
            <Header />
            <Routes>
                <Route path="/" element={<Landing />} /> 
                <Route path="member" element={<Member />} />
                <Route path="login" element={<Login />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="forgetpassword" element={<ForgetPassword />}/>
                <Route path="*" element={<Page404 />} /> 
            </Routes>
            <Footer />
        </h1>
    );
}

export default App;
