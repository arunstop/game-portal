export default {
    //initializing dark theme
    inits: {
        //reauthenticate
        auth() {
            let user = this.$store.state.localStorage.get('user', null);
            if (user != null) {
                this.$store.dispatch('auth/signIn', user);
            }
        },
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
                    let pageTitle = () => {
                        if (to.meta.title != undefined) {
                            return to.meta.title + ' — ' + 'GamePortal'
                        }
                        else {
                            return 'GamePortal' + from
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