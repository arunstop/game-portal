<template>
  <v-lazy
    :options="{
      threshold: 1,
    }"
    transition="fade-transition"
  >
    <v-col class="ma-0 pa-0">
      <p class="text-h6">Community Posts :</p>
      <main-container
        :isLoading="gameRedditPosts.isLoading"
        :isError="gameRedditPosts.isError"
        :actionReload="loadGameRedditPosts"
        :infiniteLoad="true"
        :isLoadingNext="gameRedditPosts.isLoadingNext"
        :actionNext="loadGameRedditPosts"
        :isEmpty="gameRedditPosts.data.count === 0 ? true : false"
      >
        <template v-slot:content>
          <v-col>
            <v-row
              no-gutters
              class="c-grid-list-reddit-posts d-flex justify-space-around"
            >
              <v-hover
                v-slot="{ hover }"
                v-for="post in gameRedditPosts.data.results"
                :key="post.id"
              >
                <a
                  class="text-decoration-none primary--text"
                  style="height: min-content"
                  :href="post.url"
                  target="_blank"
                >
                  <v-alert
                    class="ms-2 c-reddit-post"
                    border="left"
                    text
                    colored-border
                    :color="hover ? 'primary' : 'reddit'"
                    elevation="2"
                    max-width="600px"
                  >
                    <v-list-item>
                      <v-list-item-content>
                          <p
                            class="mt-2 font-weight-black text-h6"
                            :class="hover ? 'primary--text' : ''"
                          >
                            <img
                              v-if="post.image"
                              class="me-4 rounded-lg float-left"
                              :src="post.image"
                              height="min-content"
                              width="min-content"
                            />
                            {{ post.name }}
                          </p>
                        <p
                          class="mt-2 text-body-2"
                          :class="hover ? 'primary--text' : ''"
                        >
                          <v-icon :color="hover ? 'primary' : 'reddit'" large>
                            mdi-reddit
                          </v-icon>
                          Posted
                          <strong>{{ countCreatedTime(post.created) }}</strong>
                          by
                          <i>{{ post.username }}</i>
                        </p>
                        <!-- <p class="font-weight-bold text-h6"></p>
                    <p class=""></p> -->
                      </v-list-item-content>
                    </v-list-item>
                    <!-- <v-img
            v-if="post.image"
            :src="post.image"
            class="rounded-md"
            width="min-content"
            height="min-content"
          >
          </v-img>
          <p v-if="post.text" v-html="post.text"></p> -->
                  </v-alert>
                </a>
              </v-hover>
            </v-row>
          </v-col>
        </template>
      </main-container>
    </v-col>
  </v-lazy>
</template>

<script>
import MainContainer from "../../../miscs/MainContainer.vue";
export default {
  components: { MainContainer },

  data() {
    return {
      gameRedditPosts: {
        data: [],
        isLoading: true,
        isError: false,
        page: 1,
        isLoadingNext: false,
      },
      isActive: false,
    };
  },
  methods: {
    loadGameRedditPosts() {
      //   this.gameRedditPosts = { data: [], isLoading: true, isError: false };
      let page = this.gameRedditPosts.page;
      if (page != 1) {
        this.gameRedditPosts.isLoadingNext = true;
      }
      this.$api.call.rawg.getGameRedditPosts(
        {
          path: this.$route.params.slug,
          query: {
            page_size: 18,
            page,
          },
        },
        (response) => {
          //   if first page, only fetch the response
          if (page === 1) {
            this.gameRedditPosts = {
              ...response,
              page: this.gameRedditPosts.page,
              isLoadingNext: false,
            };
            // console.log(this.gameRedditPosts.data.results.length===0 ? true : false)
          }
          //   if not first page, get data and set page +1
          else {
            // console.log(this.gameRedditPosts.page);
            // merging data.results
            response.data.results = [].concat(
              this.gameRedditPosts.data.results,
              response.data.results
            );
            // fetch the manipulated merged/manipulated
            this.gameRedditPosts = {
              ...response,
              page: this.gameRedditPosts.page,
              isLoadingNext: false,
            };
          }
          //   adding page + 1
          this.gameRedditPosts.page++;

          //   this.$global.sorting;
          // alias for shorter code
          // let grp = this.gameRedditPosts
          // if(!grp.isError){
          // }
        }
      );
    },
    countCreatedTime(redditTime) {
      let fromNow = this.$global.moment(redditTime).calendar(null, {
        lastDay: "[yesterday at] HH:mm",
        sameDay: "[today at] HH:mm",
        nextDay: "[omorrow at] HH:mm",
        lastWeek: "[last] dddd [at] HH:mm",
        nextWeek: "dddd [at] HH:mm",
        lastMonth: "[]",
        sameElse: "DD MMMM YYYY",
      });
      //   let fromNow = this.$global.moment(redditTime).fromNow();

      //   if (fromNow === "a day ago") {
      //     fromNow = "yesterday";
      //   } else if (fromNow === "a month ago") {
      //     fromNow = "last month";
      //   } else if (fromNow === "a year ago") {
      //     fromNow = "last year";
      //   }
      return fromNow.toLowerCase();
    },
  },
  created() {
    this.loadGameRedditPosts();
  },
};
</script>

<style>
/* .c-grid-list-reddit-posts {
  position: relative;
}
.c-reddit-post:hover {
  position: absolute ; 
} */
</style>