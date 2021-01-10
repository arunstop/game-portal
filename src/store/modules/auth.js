export default {
    namespaced: true,
    state: {
        user: {
            email: null,
            password: null,
            latestSession: null,
        }
    },
    mutations: {
        SIGN_IN(state, user) {
            state.user = user
        },
        SIGN_OUT(state) {
            state.user = {}
        }
    },
    actions: {
        signIn({ commit, rootState }, user) {
            rootState.localStorage.set('user', user);
            console.log(user)
            commit('SIGN_IN')
        },
        signOut({ commit, rootState }) {
            rootState.localStorage.remove('user')
            commit('SIGN_OUT')
        }
    },
}