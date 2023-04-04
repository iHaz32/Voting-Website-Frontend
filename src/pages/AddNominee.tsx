import React from 'react';
import Logo from './vote.png';
import hands from './votinghands.jpg'
import '../styles/App.css';
import axios from "axios";
import { BrowserRouter, Route, Link} from "react-router-dom";
import "../index.css";
import {useNavigate} from 'react-router-dom';
import { Category } from "../types";




function AddNominee() {

  const [LoginVisibility, setLoginVisibility] = React.useState('block')
  const [LogoutVisibility, setLogoutVisibility] = React.useState('none')
  const [VotingVisibility, setVotingVisibility] = React.useState('none')
  const [PasswordsVisibility, setPasswordsVisibility] = React.useState('none')
  const [AddNomineeVisibility, setAddNomineeVisibility] = React.useState('none')
  const [Success, setSuccess] = React.useState('')
  const [SuccessState, setSuccessState] = React.useState('flex')
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

  const [categories, setCategories] = React.useState<Array<Category>>([]); 

  React.useEffect(() => {
    axios.get("http://localhost:8000/info").then((res) => {
      if (res.data.code === 200) {
        setCategories(res.data.data.categories)
      }
    })
  }, [])

  const add = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value
    const category = e.target[1].value
    e.target[0].value = ''
    e.target[1].value = ''
    console.log(name,category)
    axios.post("http://localhost:8000/add", {name: name, category: category}).then((res) => {
      setSuccess(res.data.msg)
      setTimeout(() => {
        setSuccessState('none')
      }, 1000);
      setTimeout(() => {
        setSuccess('')
        setSuccessState('flex')
      }, 2000);
    })
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

    <div className="flex flex-col items-center justify-center h-screen w-full bg-secondary text-white" style={{display:Default}}>
      <div className='bg-primary w-80 h-64 rounded-2xl justify-center items-center'>
          <div className='flex items-center justify-center w-full bg-white text-secondary text-2xl font-medium rounded-t-2xl'>
              Add Nominee
          </div>
          <form onSubmit={(e) => add(e)}>
          <div className='flex flex-col ml-5 mt-6'>
            <span>Enter full name:</span>
            <input type="text" id="code" className="flex bg-secondary text-white rounded text-sm w-56 pt-1 outline-0" required></input>
            <span className='flex mt-8'>Choose nomination category:</span>
            <select className='bg-secondary flex justify-center items-center w-56' name="category" id="category">
              <optgroup className='text-white font-bold' label="Students">
              {categories.filter(el => el.type === 'student').map(el => <option>{el.name}</option>)}
              </optgroup>
              <optgroup className='text-white font-bold' label="Teachers">
              {categories.filter(el => el.type === 'teacher').map(el => <option>{el.name}</option>)}
              </optgroup>
            </select>
            <div className='flex flex-row mt-7'>
            <button type="submit" className="flex w-16 h-9 justify-center items-center font-bold bg-secondary hover:bg-light opacity-90 hover:opacity-100">Submit</button>
            <span className='ml-4 w-auto flex text-green-600 font-bold opacity-80 items-center' style = {{display: SuccessState}}>{Success}</span>
            </div>
          </div>
          </form>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center h-screen w-full bg-secondary text-white" style={{display:NotAuth}}>
      <span className="text-red-600 text-3xl font-medium justify-center items-center">You are not authorized for this action.</span>
    </div>
    </>
  );
}

export default AddNominee;
