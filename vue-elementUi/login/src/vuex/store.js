import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

var store = new Vuex.Store({
    state:{
        username: ""
    },
    mutations:{
        setUsername(state, user){
            state.username = user
            localStorage.setItem("username", user)
        }
    },
    actions:{

    },
    getters:{
        username(state){
            return  localStorage.getItem("username")
          
        }
    }
})

export default store

