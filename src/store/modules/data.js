export default {
    namespaced: true,
    state: {
        genreList: { data: null, isLoading: true, isError: false },
        platformList: { data: null, isLoading: true, isError: false },
        recentGames: {
            list: { data: null, isLoading: true, isError: false },
            page: 1,
            isLoadingNext: false
        }
    },
    mutations: {
        SET_GENRE_LIST(state, list) {
            state.genreList = list
        },
        SET_PLATFORM_LIST(state, list) {
            state.platformList = list
        },
        SET_RECENT_GAMES(state, list) {
            state.recentGame = list
        }
    },
    actions: {
        setGenreList({ commit }, list) {
            commit('SET_GENRE_LIST', list)
        },
        setPlatformList({ commit }, list) {
            commit('SET_PLATFORM_LIST', list)
        },
        setRecentGames({ commit }, list) {
            commit('SET_RECENT_GAMES', list)
        }
    },
    getters: {
        isEmptyGenreList(state) {
            if (state.genreList.data == null) return true
            return false
        },
        isEmptyPlatformList(state) {
            if (state.platformList.data == null) return true
            return false
        },
        isEmptyRecentGames(state) {
            if (state.recentGames.list.data == null) return true
            return false
        }
    }
}