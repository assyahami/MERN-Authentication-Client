import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        showNotify: false,
        message: "",
        sended: false,
    },
    reducers: {
        openNotification(state, action) {
            return {
                showNotify: true,
                message: action.payload.message,
                sended: action.payload.sended
            }
        },
        closeNotification(state, action) {
            return {
                showNotify: false,
                message: '',
            }
        },
        loadingOn(state, action) {
            return {
                showNotify: true,
                message: 'loading...',
            }
        }
    }
})


const { actions, reducer } = notificationSlice

const { openNotification, closeNotification, loadingOn } = actions

export {
    openNotification,
    closeNotification,
    loadingOn
}

export default reducer