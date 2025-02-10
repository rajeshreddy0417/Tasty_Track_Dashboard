import React,{useState,useEffect} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'


const LandingPage = () => {
    const [showLogin,setShowLogin]=useState(false)
    const [showRegister,setShowRegister]=useState(false);
    const [showFirm,setShowFirm]=useState(false);
    const [showProduct,setShowProduct]=useState(false);
    const [showWelcome,setShowWelcome]=useState(false);
    const [showAllProducts,setShowAllProducts]=useState(false);
    const [showLogout,setShowLogout]=useState(false);
    const [showFirmTitle,setShowFirmTitle]=useState(true)

    useEffect(()=>{
      const loginToken=localStorage.getItem('loginToken');
      if(loginToken){
        setShowLogout(true);
      }
    },[])

    useEffect(()=>{
      const firmName=localStorage.getItem('firmName');
      if(firmName){
        setShowFirmTitle(false);
      }
    },[])

    const logoutHandler=()=>{
      confirm("Are you sure ro logout?");
      localStorage.removeItem("loginToken");
      localStorage.removeItem('firmid');
      localStorage.removeItem('firmName');
      setShowLogout(false);
      setShowFirmTitle(true);
    } 

    const showLoginHandler=()=>{
      setShowLogin(true);
      setShowRegister(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    }

    const showRegisterHandler=()=>{
      setShowRegister(true);
      setShowLogin(false);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    }

    const showFirmHandler=()=>{
      if(showLogout){
        setShowFirm(true);
        setShowRegister(false);
        setShowLogin(false);
        setShowProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
      }else{
        alert("please login");
        setShowLogin(true);
      }
    }

    const showProductHandler=()=>{
      if(showLogout){
        setShowProduct(true);
        setShowRegister(false);
        setShowLogin(false);
        setShowFirm(false);
        setShowWelcome(false);
        setShowAllProducts(false);
      }else{
        alert("please login");
        setShowLogin(true);
      }
    }

    const ShowWelcomeHandler=()=>{
      setShowProduct(false);
      setShowRegister(false);
      setShowLogin(false);
      setShowFirm(false);
      setShowWelcome(true);
      setShowAllProducts(false);
    }

    const ShowAllProductsHandler=()=>{
      if(showLogout){
        setShowProduct(false);
        setShowRegister(false);
        setShowLogin(false);
        setShowFirm(false);
        setShowWelcome(false);
        setShowAllProducts(true);
      }else{
        alert("please login");
        setShowLogin(true);
      }
    }

  return (
    <>
        <section className='landingSection'>
              <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogout={showLogout} logoutHandler={logoutHandler}/>
            <div className='collectionSection'>
                <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} ShowAllProductsHandler={ShowAllProductsHandler} showFirmTitle={showFirmTitle}/>
                {showLogin && <Login ShowWelcomeHandler={ShowWelcomeHandler}/>}
                {showRegister && <Register showLoginHandler={showLoginHandler} />}
                {showFirm && showLogout && <AddFirm/>}
                {showProduct && showLogout && <AddProduct/>}
                {showWelcome && <Welcome />}
                {showAllProducts && showLogout &&<AllProducts />}
                
                
            </div>
            
        </section>
    </>
  )
}

export default LandingPage
