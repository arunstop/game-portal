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
            }, github: 'https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/01b1af9b267471818f4f8367852bd4a2814cbae6/country_dial_info.json'
        }
        let execute = (method, url, params) => {
            // console.log(method)
            // console.log(url)
            // console.log(params)
            // if (method === 'get') {
            //     init(url).get("", params).then((response) => {
            //         console.log(response)
            //         // console.log(this.countryList);
            //       })
            //       .catch((error) => console.log(error));
            // }
            if (method === 'get') {
                return init(url).get("", { params })
            } else {
                return init(url).get("", { params })
            }
        }
        Vue.prototype.$api = {
            github: init(baseUrlSet.github),
            rawg: (method, module, params) => execute(method, baseUrlSet.rawg(module), params),
            countryFlag: (code) => { return `https://www.countryflags.io/${code}/flat/48.png` },
        }
    }
}