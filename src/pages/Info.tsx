import React from "react";
import Logo from "./vote.png";
import "../styles/App.css";
import axios from "axios";
import { Category } from "../types";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

function Info() {
  const [LoginVisibility, setLoginVisibility] = React.useState("block");
  const [LogoutVisibility, setLogoutVisibility] = React.useState("none");
  const [VotingVisibility, setVotingVisibility] = React.useState("none");
  const [PasswordsVisibility, setPasswordsVisibility] = React.useState("none");
  const [AddNomineeVisibility, setAddNomineeVisibility] =
    React.useState("none");
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
        if (connectedRole) {
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

  const [categories, setCategories] = React.useState<Array<Category>>([]);

  React.useEffect(() => {
    axios.get("http://localhost:8000/info").then((res) => {
      if (res.data.code === 200) {
        setCategories(res.data.data.categories);
      }
    });
  }, []);

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

      <div className="justify-center items-center px-16 w-full bg-secondary py-12">
        <div className="flex items-center justify-center gap-72">
          <div className="bg-quaternary w-96 text-center p-3 rounded-3xl">
            <span className="text-2xl text-primary">Student Nominations</span>
          </div>
          <div className="bg-quaternary w-96 text-center p-3 rounded-3xl">
            <span className="text-2xl text-primary">Teacher Nominations</span>
          </div>
        </div>
        <div className="flex gap-12 mt-6">
          <div className="flex justify-center items-start">
            <div className="grid grid-cols-2 2xl:grid-cols-3 items-start justify-center gap-4 h-min">
              {categories
                .filter((category) => category.type === "student")
                .map((category) => (
                  <div className="flex flex-col items-center text-white bg-primary rounded-xl shadow-xl h-52">
                    <div className="bg-quaternary w-full text-center p-1 rounded-t-md">
                      <span className="text-2xl text-primary">
                        {category.name}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col justify-center h-full">
                      <span>
                        <b>Description:</b> {category.description}
                      </span>
                      <span className="mt-auto">
                        <b>Nominees</b>: {category.nomineesNumber}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-center items-start">
            <div className="grid grid-cols-2 2xl:grid-cols-3 items-start justify-center gap-4 h-min">
              {categories
                .filter((category) => category.type === "teacher")
                .map((category) => (
                  <div className="flex flex-col items-center text-white bg-primary rounded-xl shadow-xl h-52">
                    <div className="bg-quaternary w-full text-center p-1 rounded-t-md">
                      <span className="text-2xl text-primary">
                        {category.name}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col justify-center h-full">
                      <span>
                        <b>Description</b>: {category.description}
                      </span>
                      <span className="mt-auto">
                        <b>Nominees</b>: {category.nomineesNumber}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
