import React from "react";
// import login from '../../blocks/modals/login'

export const GoogleLogout = () => {};

function initScript(d, s, id, appId) {
  return new Promise(res => {
    // let js = d.getElementsByTagName(s)[0]
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    const js = d.createElement(s);
    js.id = id;

    js.src = "https://connect.facebook.net/en_US/sdk.js";
    js.onload = e => {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: "v2.8"
      });

      res(window.FB);
    };
    fjs.parentNode.insertBefore(js, fjs);
  });
}

let FBInit = {};

class FBAuth extends React.Component {
  componentDidMount() {
    initScript(document, "script", "facebook-jssdk", this.props.appId).then(
      FB => {
        FBInit = FB;
      }
    );
    // window.fbAsyncInit()
  }
  clickHandler = () => {
    FBInit.login(
      () => {
        FBInit.api(
          "/me",
          { fields: "last_name,email,first_name" },
          meResponse => {
            const output = {
              profile: meResponse
            };
            this.props.onSuccess(output);
          }
        );
      },
      { scope: "public_profile,email" }
    );
  };

  render() {
    const { component: Component } = this.props;

    return <Component onClick={this.clickHandler} />;
  }
}

export default FBAuth;
