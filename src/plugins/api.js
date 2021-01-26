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
                // let key = "8cce4b01b3ba424f8d0a405393a02f25"
                // return apiUrl + module + '?key=' + key
                return apiUrl + module
            },
            github: {
                countryList: 'https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/01b1af9b267471818f4f8367852bd4a2814cbae6/country_dial_info.json'
            }
        }
        let rawg = {
            getRecentGames: (params) => init(baseUrlSet.rawg('games')).get('', { params }),
            getGameDetails: (params) => init(baseUrlSet.rawg(`games/${params}`)).get(''),
        }
        let github = {
            getCountryList: init(baseUrlSet.github.countryList).get(''),
        }
        let apis = {
            github,
            rawg,
            countryFlag: (code) => { return `https://www.countryflags.io/${code}/flat/48.png` },
        }
        // handling the promise event
        let handler = async (func, container, attempt) => {
            // attempting 3 API CALLS
            // if all attempts are used, nothing happened
            if (attempt <= 0) {
                console.log('All attempts are used, try to reload the page');
                return;
            }
            // if there are attempts left
            // calling api
            func
                .then((response) => {
                    //if success
                    //filling container with response data
                    container(response)
                    console.log("Getting requested data, attempt #" + attempt + ' has succeeded')
                    console.log('The data has been parsed')
                })
                .catch((error) => {
                    //if fails
                    //calling the handler again up to 3 times
                    console.log("Attempt #" + attempt + " has failed : \n" + error);
                    console.log('Executing next attempt....')
                    handler(func, container, attempt - 1);
                });
        }
        //global attempt count
        let attemptCount = 3;
        //call methods
        let call = {
            github: {
                getCountryList: (container) => handler(apis.github.getCountryList(), container, attemptCount)
            },
            rawg: {
                getRecentGames: (params, container) => (handler(apis.rawg.getRecentGames(params), container, attemptCount)),
                getGameDetails: (params, container) => (handler(apis.rawg.getGameDetails(params), container, attemptCount))
            }
        }



        // declaring  prototype
        Vue.prototype.$api = {
            // spread the apis
            ...apis,
            call
        }
    }
}