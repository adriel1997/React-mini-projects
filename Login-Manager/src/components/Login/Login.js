import React, { useState, useReducer, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state,action)=>{
  if (action.type == 'Dummy_string'){
    return {value:action.val, isValid:action.val.includes("@")};
  }
  else if (action.type == 'Typing'){
    return {value:state.value, isValid:state.isValid};
  }
  return {value:'',isValid:false};
}

const passwordReducer = (state,action)=>{
  if (action.type == 'Dummy_string'){
    return {value:action.val, isValid:action.val.length>6};
  }
  else if (action.type == 'Typing'){
    return {value:state.value, isValid:state.isValid};
  }
  return {value:'',isValid:false};
}

const Login = (props) => {
 /*  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(); */
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailcheck,updateEmailcheck] = useReducer(emailReducer,{value:'',isValid:null});
  const [passwordcheck,updatePasswordcheck] = useReducer(passwordReducer,{value:'',isValid:null});
     useEffect(() => {

     const timeoutHandler = setTimeout(() =>{
       console.log('Inside');
        setFormIsValid(
          emailcheck.isValid && passwordcheck.isValid
        );
      },500);
      return()=>{
        clearTimeout(timeoutHandler);
      }
    }, [emailcheck.isValid,passwordcheck.isValid]); 

    

  const emailChangeHandler = (event) => {
    updateEmailcheck({type:'Dummy_string',val:event.target.value});
  };

  const passwordChangeHandler = (event) => {
    updatePasswordcheck({type:'Dummy_string',val:event.target.value});
  
  };

  const validateEmailHandler = (event) => {
    updateEmailcheck({type:'Typing',val:event.target.value});
  };

  const validatePasswordHandler = (event) => {
    
    updatePasswordcheck({type:'Typing',val:event.target.value});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailcheck.value, passwordcheck.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailcheck.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailcheck.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordcheck.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordcheck.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
