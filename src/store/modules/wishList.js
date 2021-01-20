export default {
    namespaced: true,
    state: {
        wishList: []
    },
    mutations: {
        ADD(state, game) {
            state.wishList = state.wishList.concat(game)
            // console.log(state.wishList)
        },
        REMOVE(state, game) {
            state.wishList = state.wishList.filter((d) => d.id != game.id)
            // console.log(state.wishList)
        },
        EMPTY(state) {
            state.wishList = []
        },
        INIT(state, wishList) {
            state.wishList = wishList
        }
    },
    actions: {
        add({ commit, state, rootState, dispatch }, game) {
            // finding a duplicated data
            let duplicatedData = state.wishList.find((d) => d.id === game.id)
            if (!duplicatedData) {
                commit('ADD', game)
                rootState.localStorage.set('wishList', state.wishList);
                dispatch(
                    "ui/showSnackbar",
                    {
                        message: game.name + " " + "has been ADDED to your wish list",
                        type: 'success',
                    },
                    { root: true }
                )
            }
        },
        remove({ commit, state, rootState, dispatch }, game) {
            commit('REMOVE', game)
            rootState.localStorage.set('wishList', state.wishList);
            dispatch(
                "ui/showSnackbar",
                {
                    message: game.name + " " + "has been REMOVED from wish list",
                    type: 'secondary',
                },
                { root: true }
            )
        },
        empty({ commit, rootState, dispatch }) {
            commit('EMPTY')
            rootState.localStorage.remove('wishList');
            dispatch(
                "ui/showSnackbar",
                {
                    message: "Wish list has been emptied",
                    type: 'success',
                },
                { root: true }
            )
        },
        init({ commit }, wishList) {
            commit('INIT', wishList)
            // rootState.localStorage.set('wishList', state.wishList);
        }
    },
    getters: {

    }
}