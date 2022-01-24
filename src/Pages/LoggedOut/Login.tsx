import { isError, useMutation } from "react-query";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Link from "../../components/Link";
import Title from "../../components/Title";
import { useState, useEffect } from "react";
import { LoginUserInterface } from "../../dto/loggedOut.dto";
import axios from "axios";
import url_web from "../../url";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedIn } from "../../slices/loginSlice";
import { setUser } from "../../slices/userSlice";



function Login() {

  // Need to set up the redux store to use the dispatch function

  const dispatch = useDispatch();
  // const navigator = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  

  

  const verify: boolean = username.length > 4 && password.length > 4;

  // This is passed to the mutation function
  const loginFunction = async (user: LoginUserInterface): Promise<void> => {
    const { data: returnedUser } = await axios.post(url_web + "auth/login", user);

    try {
      const storedUser = await JSON.stringify(returnedUser);
      await localStorage.setItem("@user", storedUser);
      //  FIXME: What does this mean?
       await dispatch(setUser({}));
    } catch (error) {
      throw error;
    }
  };


   const onSuccess = async (): Promise<void> => {
     await dispatch(setLoggedIn(true));
  };

   const { isError, mutate } = useMutation(loginFunction, { onSuccess });

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
        backgroundColor: "#F2F2F2",
      }}
    >
      <Title label="Login" />

      <Input
        label="Usename"
        type="text"
        placeholder="John Doe"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        placeholder="*******"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <p className="text-red-600">{isError && `Wrong Username Or Password`}</p>

      <Button label="Login" isValid={verify} onClick={()=> mutate({username, password})}/>
      <Link label="Sign Up" href="/SignUp" />
    </div>
  );
}

export default Login;
