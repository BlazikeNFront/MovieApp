export default {
  namespaced: true,
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      email: null,
      userName: null,
    };
  },

  mutations: {
    setUser(state, payload) {
      state.token = payload.token;
      state.userId = payload.userId;
      state.tokenExpiration = payload.tokenExpiration;
      state.email = payload.userEmail;
      console.log(state);
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.tokenExpiration = null;
      state.email = null;
      state.userName = null;

      //clear cookies
      const cookies = document.cookie.split(";");
      cookies.forEach((cookie) => {
        const position = cookie.indexOf("=");
        const name = position > -1 ? cookie.substr(0, position) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      });
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
  },

  actions: {
    async signUp(context, payload) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS_XL-QBuPajQnPI7padxk-fwVMb9U14A",
          {
            method: "POST",
            body: JSON.stringify({
              email: payload.email,
              password: payload.password,
              returnSecureToken: true,
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error.message || "failed to sign up");
        }
        context.commit("setUser", {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn,
        });
      } catch (err) {
        throw new Error(err);
      }
    },

    async signIn(context, payload) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS_XL-QBuPajQnPI7padxk-fwVMb9U14A",
          {
            method: "POST",
            body: JSON.stringify({
              email: payload.email,
              password: payload.password,
              returnSecureToken: true,
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          const error = new Error(responseData.error.message);
          throw error;
        }

        context.commit("setUser", {
          token: responseData.idToken,
          userId: responseData.localId,
          tokenExpiration: responseData.expiresIn,
          userEmail: responseData.email,
        });
        /* Since app using firebase REST API authentication  tokens should be stored in httpOnly cookie - the problem is that there's no information in docs(or just i couldn't find it...) how to do it - or is it even possible to set headers via rules in REST API firebase, so i decided to store it in simple cookie instead of localStorage just for practice - i used localStorage in previous projects -- (https://firebase.google.com/docs/reference/rest/auth docs for rest api auth);;;  There is doc file that show how to set httpOnly cookie but only if u have ur own server(backend) that uses firebase only as database -- https://firebase.google.com/docs/auth/admin/manage-cookies */
        /* Since app using firebase REST API authentication  tokens should be stored in httpOnly cookie - the problem is that there's no information in docs(or just i couldn't find it...) how to do it - or is it even possible to set headers via rules in REST API firebase, so i decided to store it in simple cookie instead of localStorage just for practice - i used localStorage in previous projects -- (https://firebase.google.com/docs/reference/rest/auth docs for rest api auth);;;  There is doc file that show how to set httpOnly cookie but only if u have ur own server(backend) that uses firebase only as database -- https://firebase.google.com/docs/auth/admin/manage-cookies */
        /* Since app using firebase REST API authentication  tokens should be stored in httpOnly cookie - the problem is that there's no information in docs(or just i couldn't find it...) how to do it - or is it even possible to set headers via rules in REST API firebase, so i decided to store it in simple cookie instead of localStorage just for practice - i used localStorage in previous projects -- (https://firebase.google.com/docs/reference/rest/auth docs for rest api auth);;;  There is doc file that show how to set httpOnly cookie but only if u have ur own server(backend) that uses firebase only as database -- https://firebase.google.com/docs/auth/admin/manage-cookies */
        document.cookie = `user-id=${responseData.localId}; Secure`;
        document.cookie = `user-token=${responseData.idToken}; Secure`;
        document.cookie = `user-email=${responseData.email}; Secure`;
        document.cookie = `user-expiresIn=${responseData.expiresIn}; Secure`;

        const userNameData = await fetch(
          `https://movieapp-9f058-default-rtdb.firebaseio.com/Users/${context.state.userId}/userName.json`
        );

        const responseUserNameData = await userNameData.json();
        if (!userNameData.ok) {
          const error = new Error(responseData.error.message);
          throw error;
        }
        context.commit("setUserName", responseUserNameData);
      } catch (err) {
        throw new Error(err);
      }
    },
    async checkForAuthCookies(context) {
      try {
        const cookiesObject = {};
        if (!document.cookie.split("user-")) {
          return;
        }
        /* cookie names have model of (user-*) where "*" is what is stored in that cookie// FIRST SPLIT IS EMPTY !!!*/
        document.cookie.split("user-").forEach((cookie) => {
          const singleCookie = cookie.split("=");
          if (!singleCookie[1]) {
            return;
          } // removes empty prop of object that is created in first iteration of forEach loop;

          const valueForObjectProp = singleCookie[1].split(";")[0];
          cookiesObject[singleCookie[0]] = valueForObjectProp;
        });

        context.commit("setUser", {
          token: cookiesObject.token,
          userId: cookiesObject.id,
          tokenExpiration: cookiesObject.expiresIn,
          userEmail: cookiesObject.email,
        });
      } catch (err) {
        console.log(err);
      }
    },
    async setUserName(context, payload) {
      const userName = JSON.stringify(payload.userName);
      const response = await fetch(
        `https://movieapp-9f058-default-rtdb.firebaseio.com/Users/${payload.userID}/userName.json`,
        {
          method: "PUT",
          body: userName,
        }
      );

      if (!response.ok) {
        console.log("ERROR IN RESPONSE DATA IN setUserName action");
      }

      context.commit("setUserName", payload.userName);
    },

    logout(context) {
      context.commit("logout");
    },
  },

  getters: {
    isAuth(state) {
      return !!state.userId;
    },

    userId(state) {
      return state.userId;
    },

    userEmail(state) {
      return state.email;
    },

    userName(state) {
      return state.userName;
    },
  },
};
