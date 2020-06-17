import React, { Component } from "react";
import firebaseConfig from "./firebaseConfig";
import * as firebase from "firebase";
import { connect } from "react-redux";
import 

class Firebase extends Component {
  signin = () => {
    const firebaseapp = firebase.initializeApp(firebaseConfig);
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("email");

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const accessToken = res.credential.accessToken;
        if (res.user) {
          // console.log(res.user, accessToken);
          this.props.setuser(res.user.displayName);
          this.props.setAcessToken(accessToken);
          this.props.login(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <p>Hi from Firebase</p>
        <button onClick={() => this.signin()}>Click Here</button>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    user: state.user,
    accessToken: state.accessToken,
    login: state.login,
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    setuser: (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
    setAcessToken: (accessToken) => {
      dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
    },
    login: (status) => {
      dispatch({ type: "LOGIN", payload: status });
    },
  };
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Firebase);
