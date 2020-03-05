import { INCREASEMENT, DECREASEMENT } from "./actionTypes";

export const increase = (value) =>({type:INCREASEMENT, data:value})

export const decrease = (value) => ({type:DECREASEMENT, data:value})