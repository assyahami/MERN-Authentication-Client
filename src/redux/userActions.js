import axios from "axios"
import baseUrl from "../utils/baseUrl"
import { getCurrentUser, openNotification } from "./Slice"

const getUser = id => async (dispatch) => {
    try {
        const { data } = await axios.get(`${baseUrl}/api/v1/user/${id}`)
        dispatch(getCurrentUser(data))
    } catch (error) {
        dispatch(openNotification(error.response))
    }
}


export { getUser }