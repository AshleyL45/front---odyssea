import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomButton from "./components/ReusableComponents/CustomButton";
import NavbarDashboard from "./components/NavbarDashboard";
import TripItemHome from "./components/ReusableComponents/TripItemHome";
import TripItemHomeReverse from "./components/ReusableComponents/TripItemHomeReverse";
import TripItemTravel from "./components/ReusableComponents/TripItemTravel";
import TripItemTravelReverse from "./components/ReusableComponents/TripItemTravelReverse";
import TripDetails from "./components/ReusableComponents/TripDetails";
import TripDetailsReverse from "./components/ReusableComponents/TripDetailsReverse";
import BlogItem from "./components/ReusableComponents/BlogItem";
import BlogItemReverse from "./components/ReusableComponents/BlogItemReverse";
import BlogDetails from "./components/ReusableComponents/BlogDetails";
import BlogDetailsReverse from "./components/ReusableComponents/BlogDetailsReverse";
import BlogItemBlog from "./components/ReusableComponents/BlogItemBlog";
import BlogItemBlogReverse from "./components/ReusableComponents/BlogItemBlogReverse";
import SideBoard from "./components/SideBoard";
import LoginPage from "./pages/auth/LoginPage";
import {Routes, Route} from 'react-router-dom';
import RegisterPage from "./pages/auth/RegisterPage";
import {AuthProvider} from "./contexts/AuthContext";
import {ProtectedRoutes} from "./protected-routes/ProtectedRoutes";

function App() {
  return (
    <>
        <AuthProvider>

            <Routes>
                <Route element={<ProtectedRoutes/>}>

                </Route>
                <Route index={true} path="login" element={<LoginPage/>}></Route>
                <Route path="register" element={<RegisterPage/>}></Route>
            </Routes>

        </AuthProvider>

        {/*<NavbarDashboard/>
            <SideBoard/>*/}
    </>
  );
}

export default App;
