import React, { Component } from "react";
import firebaseConfig from "./firebaseConfig";
import * as firebase from "firebase";
import { connect } from "react-redux";
import "./login.scss";
class Firebase extends Component {
  signin = () => {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch {
      //pass
    }
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.readonly");
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
    console.log(this.props);
    return (
      <div>
        <h1>Hello</h1>
        <div className="google-btn">
          <div className="google-icon-wrapper">
            <img
              alt=""
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b>Sign in with google</b>
          </p>
        </div>
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
