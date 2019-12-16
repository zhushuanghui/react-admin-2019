
import store from 'store';

const USER_KEY='user_key';

//由于 localstorage 存在兼容性 所以使用 store 插件
export default{
    setUser(user){
        //localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user);
    },

    getUser(){
       // return JSON.stringify(localStorage.getItem(USER_KEY)||"{}");
        return store.get(USER_KEY)||{};
    },

    removeUser(){
        //localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    }

}