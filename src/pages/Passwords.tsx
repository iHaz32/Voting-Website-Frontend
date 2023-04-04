import React from 'react';
import Logo from './vote.png';
import '../styles/App.css';
import axios from "axios";
import { User } from "../types";
import {useNavigate} from 'react-router-dom';

function Passwords() {

  const [LoginVisibility, setLoginVisibility] = React.useState('block')
  const [LogoutVisibility, setLogoutVisibility] = React.useState('none')
  const [VotingVisibility, setVotingVisibility] = React.useState('none')
  const [PasswordsVisibility, setPasswordsVisibility] = React.useState('none')
  const [AddNomineeVisibility, setAddNomineeVisibility] = React.useState('none')
  const [Default, setDefault] = React.useState('flex')
  const [NotAuth, setNotAuth] = React.useState('none')
  const [ConnectedRole, setConnectedRole] = React.useState('')

  const navigate = useNavigate();

  React.useEffect (() => {
    axios.get("http://localhost:8000/auth/sessions/verify", {withCredentials: true} ).then((res) => {
      let connectedRole = res.data.data.role;
      console.log(connectedRole);
      if (connectedRole !== "teacher") {
        setNotAuth("flex");
        setDefault("none");
      }
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
    .catch((error) => {
        setNotAuth("flex");
        setDefault("none")
    });
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


  const [code, setCode] = React.useState('');


  const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 12;
  
  const generateCode = async (e: any) => {
    e.preventDefault()
    let password = '';
    let try_again = true;
    do {
      for (var i = 0; i < passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1); 
      } 
      
      await axios.post("http://localhost:8000/passwords", {password: password}).then((res) => {
          try_again = res.data.data.try_again
          if (res.data.code === 0) {
            setCode(password);
          }
          
      })
      
      
    

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

        <div className="flex justify-center items-center h-screen w-full bg-secondary gap-4 text-white" style={{display:Default}}>
          <div className='bg-primary w-80 h-72 rounded-2xl justify-center flex'>
            <form onSubmit={(e) => {generateCode(e)}}>
              <div className='flex flex-col bg-white text-secondary h-8 w-80 justify-center items-center text-2xl font-medium rounded-t-2xl'>
                Generate Code
              </div>
              <div className='flex items-center justify-center pt-6 px-6'>
                <span className='font-light text-md text-center'>This tool is for teachers only. Note that you should press the button once for each student and not spam it.</span>
               </div>
              <div className='flex flex-col justify-center items-center pt-10'>
                <span className='font-bold text-xl'>Code:</span>
                <span className='pb-8'>{code}</span>
                <button className="bg-secondary text-white block rounded text-sm w-56  pt-1 outline-0 font-medium">GENERATE CODE</button>
              </div>
              
            </form>
          </div>
        </div>

        <div id="alreadyVoted" className="h-screen w-full bg-secondary flex justify-center items-center" style={{display:NotAuth}}>
          <span className="text-red-600 text-3xl font-bold">You are not authorized for this action.</span>
        </div>

      </> 
    );
  }
  
  export default Passwords;