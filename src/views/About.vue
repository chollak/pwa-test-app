<template>
  <div class="about">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h3 class="d-flex justify-content-between align-items-center">
            Settings
            <small class="text-muted"></small>
          </h3>
          <hr />
          <ul class="list-group">
            <li class="list-group-item">
              <div class="row">
                <div class="col">Short name</div>
                <div class="col">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control text-center" v-model="data.short_name" />
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="row">
                <div class="col">Author name</div>
                <div class="col">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control text-center" v-model="data.author_name" />
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="row">
                <div class="col">Author URL</div>
                <div class="col">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control text-center" v-model="data.author_url" />
                  </div>
                </div>
              </div>
            </li>
            <li class="list-group-item">
              <div class="row">
                <div class="col">Page count</div>
                <div class="col">
                  <div class="input-group input-group-sm text-center">
                    <input
                      type="text"
                      class="form-control text-center"
                      disabled
                      v-model="data.page_count"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <hr />
          <a :href="data.auth_url" class="btn btn-light btn-block" target="_blank">Go to Telegraph</a>
          <button class="btn btn-success btn-block" @click="saveAccountInfo(getToken)">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      data: [{}],
      inputs: {}
    };
  },

  mounted() {
    this.getAccountInfo(
      JSON.parse(localStorage.getItem("Telegraph-current-account"))
    );
  },
  computed: {
    getToken() {
      return JSON.parse(localStorage.getItem("Telegraph-current-account"));
    }
  },
  methods: {
    async getAccountInfo(token) {
      let opt = [
        "short_name",
        "author_name",
        "author_url",
        "auth_url",
        "page_count"
      ];

      opt = JSON.stringify(opt);

      let response;

      try {
        response = await this.$http.get(
          this.$store.getters.getBaseUrl + "getAccountInfo",
          {
            params: {
              access_token: token,
              fields: opt
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
      this.data = response.data.result;
      // console.log(this.data);
      // return response.data;
    },
    async saveAccountInfo(token) {
      let response;
      try {
        response = await this.$http.get(
          this.$store.getters.getBaseUrl + "editAccountInfo",
          {
            params: {
              access_token: token,
              short_name: this.data.short_name,
              author_name: this.data.author_name,
              author_url: this.data.author_url
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
