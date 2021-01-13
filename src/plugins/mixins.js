export default {
    //initializing dark theme
    inits: {
        //re-authenticate
        auth() {
            //update local storage expire date whenever user open the app
            let user = this.$store.state.localStorage.get('user', null);
            if (user != null) {
                user.lastSession = Date.now()
                this.$store.dispatch('auth/initSignIn', user);
            }
        },
        //initiate theme
        theme() {
            let darkTheme = this.$store.state.localStorage.get('darkTheme', undefined);
            if (darkTheme != undefined) {
                this.$store.dispatch('ui/initTheme', darkTheme);
                // this.$vuetify.theme.dark = darkTheme;
            }
        },
    },
    watchers: {
        pageTitle: {
            $route: {
                immediate: true,
                handler(to, from) {
                    // console.log(to)
                    // handling undefined value of meta title that happens at the start of loading
                    from = ''
                    let appName = this.$store.state.appName
                    let pageTitle = () => {
                        if (to.meta.title != undefined) {
                            return to.meta.title + ' — ' + appName
                        }
                        else {
                            return appName + from
                        }
                    }
                    document.title = pageTitle()
                }
            }
        }
    }
    // themeWatcher: {
    //     "$vuetify.theme.dark"(newVal) {
    //         localStorage.setItem("darkTheme", JSON.stringify(newVal));
    //         // alert(JSON.parse(localStorage.getItem("darkTheme")));
    //         // this.$vuetify.theme.dark = newVal;
    //     },
    // },

}