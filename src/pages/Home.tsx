import React from 'react';
import Logo from './vote.png';
import '../styles/App.css';
import axios from "axios";
import { dblClick } from '@testing-library/user-event/dist/click';
{/* import { Candidate } from "../types"; */}

function Home() {
  
  

  {/* const [candidates, setCandidates] = React.useState<Array<Candidate>>([]); 

  const handleVote = (e: any, candidate: string) => {
    e.preventDefault();

    axios.post("http://localhost:8000/vote", {
      candidate: candidate,
    }).then((res) => {
      if (res.data.code === 200) {
        axios.get("http://localhost:8000/candidates").then((res) => {
          if (res.data.code === 200) {
            setCandidates(res.data.data.candidates)
          }
        })
      }
    })
  }

  React.useEffect(() => {
    axios.get("http://localhost:8000/candidates").then((res) => {
      if (res.data.code === 200) {
        setCandidates(res.data.data.candidates)
      }
    })
  }, []) */}

  return (
    <>
      <div className="flex px-32 items-center bg-primary text-quaternary justify-end font-bold">
        {/*Voting Site*/}
        <a className='ml-2 pr-6 flex justify-center text-2xl' href='/'>
          <div className='w-48 flex items-center justify-center gap-2'>
            <img src={Logo} width="32px" height="32px" style={{ filter: "invert(100%)" }} />
            <div className='py-3'>
              Voting Site
            </div>
          </div>
        </a>
        {/*Info*/}
        <a href="/info" className='hover:bg-tertiary py-3'> 
          <div className='w-20 text-center'>
            Info
          </div>
        </a>
        {/*Login*/}
        <a href="/login" className='hover:bg-tertiary py-3'>
          <div className='w-20 text-center'>
            Login
          </div>
        </a>
      </div>
      <div className="flex items-center justify-center absolute px-32 h-full w-full bg-secondary gap-4">
         {/*{candidates.map((candidate) => ( 
          <div className='flex flex-col items-center justify-center text-white bg-primary rounded-xl shadow-xl'>
            <img src={candidate.avatar} height="250px" width="250px" className='rounded-t-xl'/>
            <div className='bg-quaternary w-full text-center p-1'>
              <span className='text-2xl text-primary'>{candidate.name}</span>
            </div>
            <div className='p-6 flex flex-col items-center justify-center'>
              <span>Country: {candidate.country}</span> 
              <span>Age: {candidate.age}</span>
              <span>Ideology: {candidate.ideology}</span>
              <span>Experience: {candidate.experience}</span>
              <span>Votes: {candidate.votes}</span> 
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
}

export default Home;
