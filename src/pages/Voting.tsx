import React from 'react';
import Logo from './vote.png';
import hands from './votinghands.jpg'
import '../styles/App.css';
import axios from "axios";
import { BrowserRouter, Route, Link} from "react-router-dom";
import "../index.css";
import {useNavigate} from 'react-router-dom';
import { Teacher } from "../types";
import { Student } from "../types";
import { Category } from "../types";
import { StringMappingType } from 'typescript';




function Voting() {

  const [LoginVisibility, setLoginVisibility] = React.useState('block')
  const [LogoutVisibility, setLogoutVisibility] = React.useState('none')
  const [VotingVisibility, setVotingVisibility] = React.useState('none')
  const [PasswordsVisibility, setPasswordsVisibility] = React.useState('none')
  const [AddNomineeVisibility, setAddNomineeVisibility] = React.useState('none')
  const [VotesVisibility, setVotesVisibility] = React.useState('none')
  const [TempCategory, setTempCategory] = React.useState("")
  const [Display1, setDisplay1] = React.useState('flex')
  const [Display2, setDisplay2] = React.useState('none')
  const [Display2_1, setDisplay2_1] = React.useState('none')
  const [Display3, setDisplay3] = React.useState('none')
  const [Display3_1, setDisplay3_1] = React.useState('none')
  const [Display4, setDisplay4] = React.useState('none')
  const [students, setStudents] = React.useState<Array<Student>>([]); 
  const [teachers, setTeachers] = React.useState<Array<Teacher>>([]); 
  const [categories, setCategories] = React.useState<Array<Category>>([]);
  const [code, setCode] = React.useState("")
  const [NotAuth, setNotAuth] = React.useState('none')

  const navigate = useNavigate();

  React.useEffect (() => {
    axios.get("http://localhost:8000/auth/sessions/verify", {withCredentials: true} ).then((res) => {
      let connectedRole = res.data.data.role;
      console.log(connectedRole);
      setCode(res.data.data.code)
      if (connectedRole !== "student") {
        setNotAuth("flex");
        setDisplay1("none");
        setDisplay2("none");
        setDisplay2_1("none");
        setDisplay3("none");
        setDisplay3_1("none");
        setDisplay4("none");
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
        setDisplay1("none");
        setDisplay2("none");
        setDisplay2_1("none");
        setDisplay3("none");
        setDisplay3_1("none");
        setDisplay4("none");
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
 
  React.useEffect(() => {
    axios.get("http://localhost:8000/votingCategories").then((res) => {
      if (res.data.code === 200) {
        setCategories(res.data.data.categories)
      }
    })
  }, [])

  const loadStudents = async (e: any) => {
      setDisplay1('none');
      setDisplay2('grid');
  }

  const loadTeachers = async (e: any) => {
    setDisplay1('none');
    setDisplay3('grid');
  }

  const loadCandidates = async (e: any) => {
    axios.post("http://localhost:8000/votingCandidates", {button: e.target.textContent}).then((res) => {
      if (res.data.code === 0) {
        setTempCategory(e.target.textContent)
        if (res.data.data.role==='student') {
          setStudents(res.data.data.candidates);
        } else {
          setTeachers(res.data.data.candidates);
        }
        const temp: any =e.target.textContent
        const role: any = res.data.data.role
        axios.post("http://localhost:8000/votedCheck", {category: temp, code: code}).then ((res) => {
          console.log(role)
          setDisplay2('none')
          setDisplay3('none')
          if (res.data.data.check) {
            setDisplay4('flex')
          } else {
            if (role==='student') {
              setDisplay2_1('flex')
            } else {
              setDisplay3_1('flex')
            }
          }
        })
      }
    })
  }

  const loadConfirm = async (el: any) => {
    document.getElementById(el.name)!.style!.display= "none"
    document.getElementById(`confirm ${el.name}`)!.style!.display= "flex"
  }

  const cancelConfirm = async (el: any) => {
    document.getElementById(`confirm ${el.name}`)!.style!.display= "none"
    document.getElementById(el.name)!.style!.display= "flex"

  }

  const vote = async (el: any) => {
    axios.post("http://localhost:8000/vote", {name: el.name, category: TempCategory, code: code}).then((res) => {
      if (res.data.code === 0) {
        axios.post("http://localhost:8000/votingCandidates", {button: TempCategory}).then((res) => {
        setStudents(res.data.data.candidates);
      })}
    })
      document.getElementById(el.name)!.style!.display= "none"
      document.getElementById(`confirm ${el.name}`)!.style!.display= "none"
      document.getElementById(`done ${el.name}`)!.style!.display= "flex"
      setTimeout(() => {
        setDisplay1("flex");
        setDisplay2_1("none");
        setDisplay3_1("none");
        document.getElementById(el.name)!.style!.display= "flex"
        document.getElementById(`confirm ${el.name}`)!.style!.display= "none"
        document.getElementById(`done ${el.name}`)!.style!.display= "none"
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

    <div className="flex flex-col items-center gap-14 pt-10 h-screen w-full bg-secondary text-white" style={{display:Display1}}>
      <div className="text-3xl font-bold">Choose category</div>
      <div className="items-center flex flex-row gap-64">
          <button onClick={(e) => {loadStudents(e)}} className="bg-primary h-96 w-96 text-4xl rounded-lg hover:text-5xl hover:font-medium">Student<br />Nominations</button>
          <button onClick={(e) => {loadTeachers(e)}} className="bg-primary h-96 w-96 text-4xl rounded-lg hover:text-5xl hover:font-medium">Teacher<br />Nominations</button>
      </div>
    </div>

    <div className="pl-10 pt-10 grid grid-cols-5 h-screen w-full bg-secondary text-white" style={{display:Display2}}>
      {categories.filter(el => el.type === "student").map(el =>
        <button type="button" onClick={(e) => {loadCandidates(e)}} className="text-2xl font-normal flex flex-col items-center justify-center bg-primary h-52 w-52 hover:text-3xl hover:font-bold">
          {el.name}
        </button>
      )}
    </div>  

    <div className="grid grid-cols-4 gap-36 pl-10 pt-40 h-screen w-full bg-secondary text-white" style={{display:Display3}}>
      {categories.filter(el => el.type === "teacher").map(el =>
        <button type="button" onClick={(e) => {loadCandidates(e)}} className="text-2xl font-normal flex flex-col items-center justify-center bg-primary h-52 w-52 hover:text-3xl hover:font-bold">
          {el.name}
        </button>
      )}
    </div>  
    
    <div className="items-start justify-center flex h-screen w-full bg-secondary text-white" style={{display:Display2_1}}>
      <div className="pt-10 gap-32 grid grid-cols-5">
        {students.map (el =>
          <>
          <div className="bg-primary h-40 w-40 p-4 flex flex-col justify-center items-center">

            <div id={el.name} className="flex flex-col">
              <span><b>Name:</b>&nbsp;{el.name}</span>
              <span style={{display:VotesVisibility}}><b>Votes:</b>&nbsp;{el.votes}</span>
              <br />
              <button type="button" onClick={(e) => {loadConfirm(el)}} className='font-bold bg-secondary h-min w-auto p-2'>VOTE</button>
            </div>
          
            <div id={`confirm ${el.name}`} className="flex flex-col gap-6" style={{display:'none'}}>
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg text-white font-medium">Confirm?</span>
              </div>
              <div className="flex flex-row justify-center items-center gap-3 py-3">
                <button type="button" onClick={(e) => {cancelConfirm(el)}} className="bg-red-600 py-1 px-3 font-medium opacity-80 hover:font-bold hover:opacity-100 text-white">No</button>
                <button type="button" onClick={(e) => {vote(el)}} className="bg-green-600 py-1 px-3 font-medium opacity-80 hover:font-bold hover:opacity-100 text-white">Yes</button>
              </div>
            </div>  

            <div id={`done ${el.name}`} className="flex justify-center items-center" style={{display:'none'}}>
              <span className="text-green-600 text-3xl font-bold">DONE!</span>
            </div>

          </div>
          </>

        )}
      </div>
    </div>

    <div className="items-start justify-center flex h-screen w-full bg-secondary text-white" style={{display:Display3_1}}>
      <div className="pt-10 gap-32 grid grid-cols-5">
        {teachers.map (el =>
          <>
          <div className="bg-primary h-40 w-40 p-4 flex flex-col justify-center items-center">

            <div id={el.name} className="flex flex-col">
              <span><b>Name:</b>&nbsp;{el.name}</span>
              <span style={{display:VotesVisibility}}><b>Votes:</b>&nbsp;{el.votes}</span>
              <br />
              <button type="button" onClick={(e) => {loadConfirm(el)}} className='font-bold bg-secondary h-min w-auto p-2'>VOTE</button>
            </div>
          
            <div id={`confirm ${el.name}`} className="flex flex-col gap-6" style={{display:'none'}}>
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg text-white font-medium">Confirm?</span>
              </div>
              <div className="flex flex-row justify-center items-center gap-3 py-3">
                <button type="button" onClick={(e) => {cancelConfirm(el)}} className="bg-red-600 py-1 px-3 font-medium opacity-80 hover:font-bold hover:opacity-100 text-white">No</button>
                <button type="button" onClick={(e) => {vote(el)}} className="bg-green-600 py-1 px-3 font-medium opacity-80 hover:font-bold hover:opacity-100 text-white">Yes</button>
              </div>
            </div>  

            <div id={`done ${el.name}`} className="flex justify-center items-center" style={{display:'none'}}>
              <span className="text-green-600 text-3xl font-bold">DONE!</span>
            </div>

          </div>
          </>

        )}
      </div>
    </div>


    <div id="alreadyVoted" className="h-screen w-full bg-secondary flex justify-center items-center" style={{display:Display4}}>
      <span className="text-red-600 text-3xl font-bold">You have already voted for this category!</span>
    </div>

    <div id="alreadyVoted" className="h-screen w-full bg-secondary flex justify-center items-center" style={{display:NotAuth}}>
      <span className="text-red-600 text-3xl font-bold">You are not authorized for this action.</span>
    </div>

    </>
  );
}

export default Voting;
