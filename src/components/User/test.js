import React, { Component } from "react";
import PropTypes from "prop-types";
import cookie from "react-cookies";
import axios from "../helpers/axios";
import config from "../helpers/config";

const AuthContext = React.createContext();

class AuthProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);
    const token = this.getTokenCookie() || "";
    this.state = {
      isBannerSuppressed: false,
      token,
      isLoggedIn: Boolean(token),
      failedLogin: false,
      errorCode: undefined,
      loginInProgress: false
    };
  }

  componentDidMount() {
    const { token } = this.state;
    axios.defaults.headers.common.Authorization = token;
    this.setStateFromToken();
    axios.interceptors.response.use(
      // Any status code that lies within the range of 2xx causes this
      // first function to trigger
      response => response,

      // Any status codes that falls outside the range of 2xx causes this
      // second function to trigger
      error => {
        if (error?.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  componentWillUnmount() {
    axios.defaults.headers.common.Authorization = undefined;
  }

  setStateFromToken = async () => {
    const token = this.getTokenCookie() || "";
    const isLoggedIn = !!token;
    let name;
    let ref;

    if (isLoggedIn) {
      await axios
        .get(config.client.user_service.get_credentials_from_user_principles)
        .then(response => {
          name = response.data.firstName;
          ref = response.data.customerRef;
        })
        .catch(error => {
          throw error;
        });
    }

    this.setState({
      token,
      firstName: name,
      isLoggedIn,
      failedLogin: false,
      errorCode: undefined,
      loginInProgress: false,
      customerRef: ref
    });
  };

  getTokenCookie = () => {
    return cookie.load("token");
  };

  getAppTokenCookie = async () => {
    let appToken = cookie.load("app_token");
    if (!appToken) {
      await axios.get("/");
      appToken = cookie.load("app_token");
    }
    return appToken;
  };

  // axios.create will run only once in it's helper file
  // The jwt will change during login thus Auth must be imperatively set.
  // We are also not able to subscribe the headers to change.
  // Cookie change is not an event in older browsers.
  // Thus this is the simpliest solution.
  setTokenCookie = token => {
    cookie.save("token", token, {
      path: "/",
      secure: config.client.cookieSecure === "true"
    });
  };

  resetTokenCookie = () => {
    cookie.remove("token", {
      path: "/",
      secure: config.client.cookieSecure === "true"
    });
  };

  suppressBanner = display => {
    this.setState({ isBannerSuppressed: display });
  };

  setAllFromToken = authToken => {
    axios.defaults.headers.common.Authorization = authToken;
    this.setTokenCookie(authToken);
    this.setStateFromToken();
  };

  registration = async userInfo => {
    const appTokenCookie = await this.getAppTokenCookie();
    return axios
      .post(config.client.user_service.register, userInfo, {
        headers: {
          Authorization: appTokenCookie
        }
      })
      .then(response => {
        const authToken = response.data.token;
        axios.defaults.headers.common.Authorization = authToken;
        this.setTokenCookie(authToken);
        this.setStateFromToken();
        return response;
      })
      .catch(error => {
        if (error.response) {
          this.setState({
            failedLogin: true,
            errorCode: error.response.data.returnCode,
            loginInProgress: false
          });
        } else {
          this.setState({
            failedLogin: true,
            errorCode: 500,
            loginInProgress: false
          });
        }
      });
  };

  login = async credentials => {
    const appTokenCookie = await this.getAppTokenCookie();
    this.setState({ loginInProgress: true });
    return (
      axios
        .post(config.client.user_service.login, credentials, {
          headers: {
            Authorization: appTokenCookie
          }
        })
        .then(response => {
          const authToken = response.data.token;
          axios.defaults.headers.common.Authorization = authToken;
          this.setTokenCookie(authToken);
          this.setStateFromToken();
          return response;
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          if (error.response) {
            this.setState({
              failedLogin: true,
              errorCode: error.response.data.returnCode,
              loginInProgress: false,
              accountTimeout:
                error.response.data.data && error.response.data.data.timeout
                  ? error.response.data.data.timeout
                  : 0
            });
          } else {
            this.setState({
              failedLogin: true,
              errorCode: 500,
              loginInProgress: false
            });
          }
        })
    );
  };

  // TODO write tests for the logout function once it is properly implemented
  logout = () => {
    axios.defaults.headers.common.Authorization = undefined;
    /* istanbul ignore next */
    this.resetTokenCookie();
    /* istanbul ignore next */
    this.setState({
      token: ""
    });
    this.setStateFromToken();
  };

  render() {
    const { children } = this.props;
    const {
      token,
      firstName,
      isLoggedIn,
      loginInProgress,
      failedLogin,
      errorCode,
      isBannerSuppressed,
      accountTimeout,
      customerRef
    } = this.state;
    return (
      <AuthContext.Provider
        value={{
          login: this.login,
          registration: this.registration,
          logout: this.logout,
          suppressBanner: this.suppressBanner,
          setAllFromToken: this.setAllFromToken,
          token,
          firstName,
          loginInProgress,
          failedLogin,
          errorCode,
          isLoggedIn,
          isBannerSuppressed,
          accountTimeout,
          customerRef
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

// eslint-disable-next-line no-shadow
export const withContext = Component => {
  return props => {
    return (
      <AuthContext.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />;
        }}
      </AuthContext.Consumer>
    );
  };
};

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };
