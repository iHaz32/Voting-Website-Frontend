import React from "react";
import Logo from "./vote.png";
import "../styles/App.css";
import axios from "axios";
import { rootCertificates } from "tls";
import { useNavigate } from "react-router-dom";

function Login() {
  const [LoginVisibility, setLoginVisibility] = React.useState("block");
  const [LogoutVisibility, setLogoutVisibility] = React.useState("none");
  const [VotingVisibility, setVotingVisibility] = React.useState("none");
  const [PasswordsVisibility, setPasswordsVisibility] = React.useState("none");
  const [AddNomineeVisibility, setAddNomineeVisibility] =
    React.useState("none");
  const [ErrMsg, setErrMsg] = React.useState("‎");
  const [Default, setDefault] = React.useState("flex");
  const [NotAuth, setNotAuth] = React.useState("none");
  const [ConnectedRole, setConnectedRole] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/auth/sessions/verify", {
        withCredentials: true,
      })
      .then((res) => {
        let connectedRole = res.data.data.role;
        console.log(connectedRole);
        if (connectedRole) {
          setNotAuth("flex");
          setDefault("none");
          setLoginVisibility("none");
          setLogoutVisibility("block");
          setVotingVisibility("block");
          if (connectedRole === "teacher") {
            setPasswordsVisibility("block");
            setAddNomineeVisibility("block");
          }
        }
      });
  }, []);

  const logout = async (e: any) => {
    axios
      .get("http://localhost:8000/auth/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setLoginVisibility("block");
        setLogoutVisibility("none");
        setVotingVisibility("none");
        setPasswordsVisibility("none");
      });
    setTimeout(() => {
      navigate("/Home");
    }, 500);
  };

  const [AttRole, setAttRole] = React.useState("");

  const recognizeStudent = async (e: any) => {
    setAttRole("student");
    console.log(AttRole);
  };
  const recognizeTeacher = async (e: any) => {
    setAttRole("teacher");
    console.log(AttRole);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const code = e.target[0].value;
    let role;
    let wrong;

    axios
      .post(
        "http://localhost:8000/auth/login",
        { code: code, role: AttRole },
        { withCredentials: true }
      )
      .then((res) => {
        role = res.data.data.role;
        wrong = res.data.data.wrong;
        if (wrong === false && role === AttRole) {
          console.log("Connection successful as a: " + role + ".");
          navigate("/home");
        } else if (wrong === true) {
          console.log("No account found.");
          setErrMsg("No account found");
        } else {
          console.log("You are not authorized.");
          setErrMsg("You are not authorized");
        }
      });
  };

  return (
    <>
      <div className="flex items-center bg-primary text-quaternary font-bold gap-3">
        {/*Voting Site*/}
        <a className="ml-2 pr-6 flex justify-center text-2xl" href="/">
          <div className="w-45 flex items-center justify-center gap-2">
            <img
              src={Logo}
              width="40px"
              height="40px"
              style={{ filter: "invert(100%)" }}
            />
            <div className="py-3">Voting Site</div>
          </div>
        </a>
        {/*Home*/}
        <a href="/home" className="hover:bg-tertiary py-3">
          <div className="w-20 text-center text-lg">Home</div>
        </a>
        {/*Info*/}
        <a href="/info" className="hover:bg-tertiary py-3">
          <div className="w-20 text-center text-lg">Info</div>
        </a>
        {/*Voting*/}
        <a
          href="/voting"
          className="hover:bg-tertiary py-3"
          style={{ display: VotingVisibility }}
        >
          <div className="w-20 text-center text-lg">Voting</div>
        </a>
        {/*Passwords*/}
        <a
          href="/passwords"
          className="hover:bg-tertiary py-3"
          style={{ display: PasswordsVisibility }}
        >
          <div className="w-36 text-center text-lg">Generate Code</div>
        </a>
        {/*Add Nominee*/}
        <a
          href="/addNominee"
          className="hover:bg-tertiary py-3"
          style={{ display: AddNomineeVisibility }}
        >
          <div className="w-32 text-center text-lg">Add Nominee</div>
        </a>
        {/*Login*/}
        <a
          href="/login"
          className="hover:bg-tertiary py-3 ml-auto"
          style={{ display: LoginVisibility }}
        >
          <div className="w-20 text-center text-lg">Login</div>
        </a>
        {/*Logout*/}
        <button
          className="hover:bg-tertiary py-3 ml-auto"
          style={{ display: LogoutVisibility }}
        >
          <div onClick={(e) => logout(e)} className="w-20 text-center text-lg">
            Logout
          </div>
        </button>
      </div>

      <div
        className="flex justify-center items-center h-screen w-full bg-secondary gap-4 text-white"
        style={{ display: Default }}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="bg-primary w-80 h-96 rounded-2xl">
            <div className="flex items-center justify-center w-full bg-white text-secondary text-2xl font-medium rounded-t-2xl">
              Insert Code
            </div>

            <div className="flex flex-col items-center justify-center pt-24">
              <span className="text-sm font-light text-white">
                Insert code then press your role
              </span>
              <input
                type="text"
                id="code"
                className="bg-secondary text-white block rounded text-sm w-56 pt-1 outline-0"
                required
              ></input>
              <span className="text-sm text-red-600">{ErrMsg}</span>
            </div>

            <div className="flex flex-row gap-5 items-center justify-center pt-28 pb-2 px-5">
              <button
                type="submit"
                onClick={(e) => recognizeStudent(e)}
                className="flex items-center justify-center w-full bg-white text-secondary rounded text-xl font-medium hover:font-bold"
              >
                Student
              </button>
              <button
                type="submit"
                onClick={(e) => recognizeTeacher(e)}
                className="flex items-center justify-center w-full bg-white text-secondary rounded text-xl font-medium hover:font-bold"
              >
                Teacher
              </button>
            </div>

            <hr></hr>

            <div className="flex items-center justify-center p-3">
              <span className="text-xs font-thin">
                Contact a teacher if you do not have your own code
              </span>
            </div>
          </div>
        </form>
      </div>

      <div
        id="alreadyVoted"
        className="h-screen w-full bg-secondary flex justify-center items-center"
        style={{ display: NotAuth }}
      >
        <span className="text-red-600 text-3xl font-bold">
          You are already logged in.
        </span>
      </div>
    </>
  );
}

export default Login;
