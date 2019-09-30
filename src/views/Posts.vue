<template>
  <div class="posts">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <template v-if="posts">
            <h3 class="d-flex justify-content-between align-items-center">
              Posts
              <small class="text-muted">{{posts.result.total_count}}</small>
            </h3>
            <hr />            
            <div class="post" v-for="post in posts.result.pages" :key="post.path">
              <div class="card mb-4">
                <img class="card-img-top" :src="post.image_url" alt="Card image cap" />
                <div class="card-body">
                  <h2 class="card-title">{{post.title}}</h2>
                  <p class="card-text">{{post.description}}</p>
                  <a :href="post.url" class="btn btn-outline-info mr-2" target="_blank">Edit</a>
                  <router-link
                    :to="{ name: 'post', params: { path: post.path }}"
                    class="btn btn-primary"
                  >Read More →</router-link>
                </div>
                <div class="card-footer text-muted">Posted by {{post.author_name}}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: null
    };
  },
  mounted() {
    this.getPageList(10);
  },
  methods: {
    async getPageList(lim = 50, off = 0) {
      const response = await this.$http.get(
        this.$store.getters.getBaseUrl + "getPageList",
        {
          params: {
            access_token: JSON.parse(
              localStorage.getItem("Telegraph-current-account")
            ),
            offset: off,
            limit: lim
          }
        }
      );
      this.posts = response.data;
    }
  }
};
</script>

<style scoped>
.post {
  max-width: 600px;
  margin: auto;
  /* display: flex; */
}
</style>
