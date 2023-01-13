import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        showNotify: false,
    },
    reducers: {
        openNotification(state, action) {
            return {
                showNotify: true,
                message: action.payload.message,
            }
        },
        closeNotification(state, action) {
            return {
                showNotify: false,
                message: '',
            }
        }
    }
})


const { actions, reducer } = notificationSlice

const { openNotification, closeNotification} = actions

export {
    openNotification,
    closeNotification,
}

export default reducer