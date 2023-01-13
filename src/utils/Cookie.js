import Cookies from "js-cookie"

const storeCookie = (user) => {
  let getToken = user.userToken
  let getID = user.userID
  Cookies.set("token", getToken, {
    expires: 7,
  })
  Cookies.set("user_id", getID, {
    expires: 7,
  })
}

const clearAllCookie = async () => {
  Cookies.remove("token")
  Cookies.remove("user_id")
}
export { storeCookie, clearAllCookie }