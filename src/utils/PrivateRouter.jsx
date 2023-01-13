import Cookies from "js-cookie"
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
    let ISAUTH = Cookies.get("token")
    return (
        ISAUTH ? props.children : <Navigate to='/accounts/signin' />
    )
}

export default PrivateRoute