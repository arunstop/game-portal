export default {
    namespaced: true,
    state: {
        user: {}
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
        signIn({ commit, rootState, dispatch }, user) {
            rootState.localStorage.set('user', user);
            let snackbarProps = {
                message: `Login success! Hello ${user.email}`,
                type: `success`,
            }
            commit('SIGN_IN', user)
            //added root true to make dispatch able to access the root
            dispatch("ui/showSnackbar", snackbarProps, { root: true });
        },
        signOut({ commit, rootState, dispatch }) {
            rootState.localStorage.remove('user')
            let snackbarProps = {
                message: `Logout success, see ya next time!`,
                type: `success`,
            }
            commit('SIGN_OUT')
            dispatch("ui/showSnackbar", snackbarProps, { root: true });
        }
    },
    getters: {
        isSignedIn(state) {
            // checking if object user in state is empty or not
            if (Object.keys(state.user).length === 0) {
                return false;
            }
            return true
        }
    }
}