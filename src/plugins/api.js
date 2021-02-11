import axios from 'axios'

export default {
    install(Vue) {
        let init = (baseURL, options) => axios.create({
            baseURL,
            timeout: 10000, // milliseconds
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
            getSimilarGames: (params) => init(baseUrlSet.rawg(`games/${params}/suggested`)).get(''),
            getGameRedditPosts: (params) => init(baseUrlSet.rawg(`games/${params.path}/reddit`)).get('', { params: params.query }),
        }
        let github = {
            getCountryList: ()=>init(baseUrlSet.github.countryList).get(''),
        }
        let extra = {
            getCountryFlag: (code) => { return `https://www.countryflags.io/${code}/shiny/48.png` },
        }
        let apis = {
            github,
            rawg,
            extra
        }
        // handling the promise event
        let handler = async (apiCall, container, attempt) => {
            let finalResponse = {
                data: null,
                isLoading: false,
                isError: false
            }
            // attempting 3 API CALLS
            // if all attempts are used, nothing happened
            if (attempt <= 0) {
                console.log('All attempts are used, try to reload the page');
                finalResponse.isError = true
                container(finalResponse)
                return;
            }
            // if there are attempts left
            // calling api
            apiCall
                .then((response) => {
                    //if success
                    //filling container with response data
                    console.log(response.config.baseURL)
                    finalResponse.data = response.data
                    container(finalResponse)
                    console.log("Getting requested data, attempt #" + attempt + ' has succeeded')
                    console.log('The data has been parsed')
                })
                .catch((error) => {
                    //if fails
                    //calling the handler again up to 3 times
                    console.log("Attempt #" + attempt + " has failed : \n" + error);
                    console.log('Executing next attempt....')
                    handler(apiCall, container, attempt - 1);
                });
        }
        //global attempt count
        let attemptCount = 3;
        //call methods
        let call = {
            github: {
                getCountryList: (container) => (handler(apis.github.getCountryList(), container, attemptCount))
            },
            rawg: {
                getRecentGames: (params, container) => (handler(apis.rawg.getRecentGames(params), container, attemptCount)),
                getGameDetails: (params, container) => (handler(apis.rawg.getGameDetails(params), container, attemptCount)),
                getSimilarGames: (params, container) => (handler(apis.rawg.getSimilarGames(params), container, attemptCount)),
                getGameRedditPosts: (params, container) => (handler(apis.rawg.getGameRedditPosts(params), container, attemptCount)),
            },
            extra
        }


        //========================
        // declaring  prototype
        Vue.prototype.$api = {
            // spread the apis
            call
        }
    }
}