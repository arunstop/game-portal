import axios from 'axios'

export default {
    install(Vue) {
        let init = (baseURL, options) => axios.create({
            baseURL,
            timeout: 10000,
            ...options
        })
        let baseUrlSet = {
            rawg: (module) => {
                let apiUrl = "https://api.rawg.io/api/"
                let key = "8cce4b01b3ba424f8d0a405393a02f25"
                return apiUrl + module + '?key=' + key
            },
            github: 'https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/01b1af9b267471818f4f8367852bd4a2814cbae6/country_dial_info.json'
        }
        let rawg = {
            getRecentGames: (params) => init(baseUrlSet.rawg('games')).get('', { params }),
        }
        let github = {
            getCountryList: init(baseUrlSet.github).get(''),
        }
        let apis = {
            github,
            rawg,
            countryFlag: (code) => { return `https://www.countryflags.io/${code}/flat/48.png` },
        }

        Vue.prototype.$api = {
            ...apis
        }
    }
}