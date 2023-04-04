import React from 'react';
import Logo from './vote.png';
import hands from './votinghands.jpg'
import '../styles/App.css';
import axios from "axios";
import { BrowserRouter, Route, Link} from "react-router-dom";
import "../index.css";
import {useNavigate} from 'react-router-dom';




function Main() {

  const [LoginVisibility, setLoginVisibility] = React.useState('block')
  const [LogoutVisibility, setLogoutVisibility] = React.useState('none')
  const [VotingVisibility, setVotingVisibility] = React.useState('none')
  const [PasswordsVisibility, setPasswordsVisibility] = React.useState('none')
  const [AddNomineeVisibility, setAddNomineeVisibility] = React.useState('none')

  const navigate = useNavigate();

  React.useEffect (() => {
    axios.get("http://localhost:8000/auth/sessions/verify", {withCredentials: true} ).then((res) => {
      let connectedRole = res.data.data.role;
      console.log(connectedRole)
        if (connectedRole) {
          setLoginVisibility('none');
          setLogoutVisibility('block');
          setVotingVisibility('block');
          if (connectedRole === 'teacher') {
            setPasswordsVisibility('block');
            setAddNomineeVisibility('block');
          }
        }
    })
    }, [])

  const logout = async (e: any) => {
    axios.get("http://localhost:8000/auth/logout", {withCredentials: true}).then((res) => {
      console.log(res.data)
      setLoginVisibility('block');
      setLogoutVisibility('none');
      setVotingVisibility('none');
      setPasswordsVisibility('none');
    })
    setTimeout(() => {
      navigate('/Home')
    }, 500);
  }

  return (
    <>
      <div className="flex items-center bg-primary text-quaternary font-bold gap-3">
        {/*Voting Site*/}
        <a className='ml-2 pr-6 flex justify-center text-2xl' href='/'>
          <div className='w-45 flex items-center justify-center gap-2'>
            <img src={Logo} width="40px" height="40px" style={{ filter: "invert(100%)" }} />
            <div className='py-3'>
              Voting Site
            </div>
          </div>
        </a>
        {/*Home*/}
        <a href="/home" className='hover:bg-tertiary py-3'> 
           <div className='w-20 text-center text-lg'>
             Home
           </div>
        </a>
        {/*Info*/}
        <a href="/info" className='hover:bg-tertiary py-3'> 
           <div className='w-20 text-center text-lg'>
             Info
          </div>
        </a>
        {/*Voting*/}
        <a href="/voting" className='hover:bg-tertiary py-3' style={{ display: VotingVisibility}}> 
          <div className='w-20 text-center text-lg'>
            Voting
          </div>
        </a>
        {/*Passwords*/}
        <a href="/passwords" className='hover:bg-tertiary py-3' style={{ display: PasswordsVisibility}}>
          <div className='w-36 text-center text-lg'>
            Generate Code
          </div>
        </a>
        {/*Add Nominee*/}
        <a href="/addNominee" className='hover:bg-tertiary py-3' style={{ display: AddNomineeVisibility}}>
        <div className='w-32 text-center text-lg'>
            Add Nominee
        </div>
        </a>        
        {/*Login*/}
        <a href="/login" className='hover:bg-tertiary py-3 ml-auto' style={{ display: LoginVisibility}}>
          <div className='w-20 text-center text-lg'>
            Login
          </div>
        </a>
        {/*Logout*/}
        <button className='hover:bg-tertiary py-3 ml-auto' style={{ display: LogoutVisibility}}>
          <div onClick={(e) => logout(e)} className='w-20 text-center text-lg'>
             Logout
          </div>
        </button>
      </div>
      <div className="flex justify-center h-screen w-full bg-secondary gap-4 text-white">
      <img src={hands} className='opacity-[0.2] relative h-screen w-screen' style={{ filter: "invert(100%)" }} ></img>
        <div className='text-2xl text-center absolute w-fit top-32'>
            <b>Welcome to the voting site of our school!</b>
        </div>
        <div className='text-lg text-center absolute px-40 top-44'>
            <p> 
                In this site, students have the ability to vote for 10 different student nominations and 5 different teacher nominations. 
                In order to vote, you have to contact a teacher to register your account and then stay <a href="/login" className= 'hover:bg-tertiary'><u>logged in</u></a>. 
                If you also want to become a nominee, contact any teacher and he will add you to the categories you want.
                For more information, check the <a href="/info" className= 'hover:bg-tertiary'><u>Info</u></a> page. When you are ready to start voting, visit <a href="/vote" className='hover:bg-tertiary'><u>Voting</u></a> page.
                For any questions, contact the students council of our school.
            </p>       
        </div> 
      </div>
    </>
  );
}

export default Main;
