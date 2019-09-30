<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <template v-if="data">
          <div id="article"></div>            
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null
    };
  },
  mounted() {
    this.getPage();
  },
  methods: {
    // async getPage() {
    //   const response = await this.$http.get(
    //     this.$store.getters.getBaseUrl + "getPage",
    //     {
    //       params: {
    //         path: this.$route.params.path,
    //         return_content: true
    //       }
    //     }
    //   );
    //   this.data = response.data;
    //   this.setContent();
    // },
    getPage() {
      this.$http
        .get(this.$store.getters.getBaseUrl + "getPage", {
          params: {
            path: this.$route.params.path,
            return_content: true
          }
        })
        .then(response => {
          this.data = response.data;
        })
        .catch(er => {
          console.log(er);
        })
        .finally(() => {
          this.setContent();
        });
    },
    nodeToDom(node) {
      if (typeof node === "string" || node instanceof String) {
        return document.createTextNode(node);
      }
      if (node.tag) {
        var domNode = document.createElement(node.tag);
        if (node.attrs) {
          for (var name in node.attrs) {
            var value = node.attrs[name];
            domNode.setAttribute(name, value);
          }
        }
      } else {
        domNode = document.createDocumentFragment();
      }
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          var child = node.children[i];
          domNode.appendChild(this.nodeToDom(child));
        }
      }
      return domNode;
    },
    setContent() {
      var article = document.getElementById("article");
      //   console.log(this.data.result.content);
      if (this.data.result.content) {
        while (article.firstChild) {
          article.removeChild(article.firstChild);
        }
        article.appendChild(
          this.nodeToDom({ children: this.data.result.content })
        );
      }
    }
  }
};
</script>

<style>
.post {
  max-width: 600px;
  margin: auto;
  /* display: flex; */
}
img {
  max-width: 100%;
  height: auto;
}
#article figcaption {
  margin-top: 5px;
  text-align: center;
  font-size: 0.9rem;
  color: gray;
}
</style>