<template>
  <div class="home fontchange text-center">
    <h1>Welcome to Bloggr!</h1>
    <div class="blogs row justify-content-center">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="col-4 my-3 btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#blog-modal"
      >Create Blog</button>
    </div>
    <h5>create your own blog or click on a blog title below</h5>
    <!-- Modal -->
    <div
      class="modal fade"
      id="blog-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Blog</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <form @submit.prevent="addBlog">
                <div class="form-group row">
                  <label for="inputName" class="col-sm-1-12 col-form-label"></label>
                  <div class="col-sm-1-12">
                    <input
                      type="text"
                      class="form-control"
                      name="title"
                      id="inputName"
                      placeholder="Enter blog title here..."
                      v-model="newBlog.title"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputBlog" class="col-sm-1-12 col-form-label"></label>
                  <div class="col-sm-1-12">
                    <textarea
                      id="inputBlog"
                      v-model="newBlog.body"
                      name="inputBlog"
                      rows="8"
                      placeholder="Enter blog content here..."
                      cols="50"
                    ></textarea>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputTags" class="col-sm-1-12 col-form-label"></label>
                  <div class="col-sm-1-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter tags here..."
                      name="inputTags"
                      id="inputTags"
                      v-model="newBlog.tags"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputName" class="col-sm-1-12 col-form-label"></label>
                  <div class="col-sm-1-12">
                    <input
                      type="text"
                      class="form-control"
                      name="email"
                      id="email"
                      placeholder="Your email address..."
                      v-model="newBlog.creatorEmail"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputName" class="col-sm-1-12 col-form-label"></label>
                  <div class="col-sm-1-12">
                    <input
                      type="text"
                      class="form-control"
                      name="imgUrl"
                      id="inputName"
                      placeholder="Enter image url here..."
                      v-model="newBlog.imgUrl"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-sm-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit Blog</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal End -->
    <div class="grid" id="lists">
      <div class="grid-item">
        <blog v-for="blog in blogs" :blogData="blog" :key="blog.id" />
      </div>
    </div>
  </div>
</template>

<script>
import Blog from "../components/Blog";
export default {
  name: "blogs",
  data() {
    return {
      newBlog: {},
    };
  },
  mounted() {
    this.$store.dispatch("getBlogs");
  },
  computed: {
    blogs() {
      return this.$store.state.blogs;
    },
  },
  methods: {
    addBlog() {
      this.$store.dispatch("addBlog", this.newBlog);
      this.newBlog = {};
      $("#blog-modal").modal("hide");
    },
  },
  components: {
    Blog,
  },
};
</script>


<style scoped>
</style>
