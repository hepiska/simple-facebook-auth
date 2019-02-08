import React from "react"
// import login from '../../blocks/modals/login'

function initScript(d, s, id, appId) {
  return new Promise(res => {
    // let js = d.getElementsByTagName(s)[0]
    const fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) {
      return
    }
    const js = d.createElement(s)
    js.id = id

    js.src = "https://connect.facebook.net/en_US/sdk.js"
    js.onload = e => {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: "v2.8"
      })

      res(window.FB)
    }
    fjs.parentNode.insertBefore(js, fjs)
  })
}

let FBInit = {}

class FBAuth extends React.Component {
  componentDidMount() {
    initScript(document, "script", "facebook-jssdk", this.props.appId).then(
      () => {
        window.FB.init({
          appId: this.props.appId,
          cookie: true,
          xfbml: true,
          version: "v2.8"
        })
        FBInit = window.FB
      }
    )
    // window.fbAsyncInit()
  }
  clickHandler = () => {

    window.FB.login(
      (res) => {
        if (res.status === 'connected') {
          window.FB.api(
            "/me",
            { fields: "last_name,email,first_name,picture" },
            meResponse => {
              const output = {
                profile: meResponse
              }
              this.props.onSuccess(output)
            }
          )
        }

      },
      { scope: "public_profile,email" }
    )
  };

  render() {
    const { component: Component } = this.props

    return <Component onClick={this.clickHandler} />
  }
}

export default FBAuth
