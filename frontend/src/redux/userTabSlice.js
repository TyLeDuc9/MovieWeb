import {createSlice} from '@reduxjs/toolkit'
const userTabSlice=createSlice({
    name:'userTab',
    initialState:{
       activeTabKey: 4
    },
    reducers:{
        setActiveTab:(state, action)=>{
            state.activeTabKey = action.payload; 
        }
    }
})
export const {setActiveTab} =userTabSlice.actions
export default userTabSlice.reducer