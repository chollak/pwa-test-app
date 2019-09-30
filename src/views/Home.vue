<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <pre v-if="data">
        {{data}}
      </pre>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Short name" v-model="shortName" />
          </div>

          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Author name" v-model="authorName" />
          </div>
          <button class="btn btn-light btn-block" @click="createAccount">Create new account</button>
        </div>
        <div class="col-md-9">
          <div class="row">
            <!-- <div v-for="(a,index) in accountsInfo" :key="index">{{a.result.short_name}}</div> -->
            <div class="col-md-4 mb-3" v-for="(acc,index) in accountsInfo" :key="index">
              <div
                class="card text-center"
                :class="{'bg-vue text-white':$store.state.accessToken==accounts[index]}"
              >
                <div class="card-body">
                  <h5 class="card-title">{{acc.result.short_name}}</h5>
                  <p class="card-text">{{acc.result.author_name}}</p>
                  <a href="#" class="btn btn-success" @click="chooseAccount(index)" v-if="$store.state.accessToken!=accounts[index]">Choose it</a>
                </div>
              </div>
            </div>
          </div>
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
      shortName: "",
      authorName: "",
      accountsInfo: [],
      data: null,
      accounts: []
    };
  },
  mounted() {
    this.initData();
  },

  methods: {
    async initData() {
      const accounts = [];
      if (localStorage.getItem("Telegraph-accounts")) {
        const tokens = JSON.parse(localStorage.getItem("Telegraph-accounts"));
        this.accounts = tokens;

        for (const token of tokens) {
          accounts.push(this.getAccountInfo(token));
        }
        this.accountsInfo = await Promise.all(accounts);
        // console.log(await Promise.all(this.accounts))
      }

      if (localStorage.getItem("Telegraph-current-account")) {
        try {
          this.$store.state.accessToken = JSON.parse(
            localStorage.getItem("Telegraph-current-account")
          );
        } catch (e) {
          localStorage.removeItem("Telegraph-current-account");
        }
      }
    },
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

      return response.data;
    },
    async createAccount() {
      const response = await this.$http.get(
        this.$store.getters.getBaseUrl + "createAccount",
        {
          params: {
            short_name: this.shortName,
            author_name: this.authorName
          }
        }
      );

      this.data = response.data;
      if (response.data.ok) {
        let accounts = JSON.parse(localStorage.getItem("Telegraph-accounts"));
        this.accounts.push(this.data.result.access_token);
        if (accounts == null) accounts = "";
        const parsed = JSON.stringify([
          ...accounts,
          response.data.result.access_token
        ]);
        localStorage.setItem("Telegraph-accounts", parsed);
        this.initData();
      }
    },
    chooseAccount(token) {
      this.$store.state.accessToken = this.accounts[token];
      const parsed = JSON.stringify(this.accounts[token]);
      localStorage.setItem("Telegraph-current-account", parsed);
    }
  }
};
</script>
