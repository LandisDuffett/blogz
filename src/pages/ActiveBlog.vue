<template>
  <div class="active-blog">
    <h3>Title:{{blog.blog.title}}</h3>
    <img class="img-fluid" :src="active-blog.imgUrl" />
    <h3>Blog:{{blog.blog.body}}</h3>
    <div>
      <button
        type="button"
        class="col-4 mb-3 btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#comment-modal"
      >Add Comment</button>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="comment-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Comment</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <form @submit.prevent="addComment">
                <div class="form-group row">
                  <label for="inputName" class="col-sm-1-12 col-form-label">Your Comment:</label>
                  <div class="col-sm-1-12">
                    <input
                      type="text"
                      class="form-control"
                      name="title"
                      id="inputName"
                      placeholder="Enter blog title here..."
                      v-model="newComment.body"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-sm-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit Comment</button>
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
    <h3 v-for="comment in comments" :key="comment.blogId">Comment:{{comment.body}}</h3>
  </div>
</template>

<script>
import Comment from "../components/Comment";
export default {
  name: "active-blog",
  data() {
    return {
      newComment: {},
    };
  },
  mounted() {
    this.$store.dispatch("getBlog", this.$route.params.id);
    this.$store.dispatch("getComments", this.$route.params.id);
  },
  computed: {
    blog() {
      return this.$store.state.activeBlog;
    },
    comments() {
      return this.$store.state.comments;
    },
  },
  methods: {
    addComment() {
      this.newComment.blogId = this.blog.id;
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {};
      $("#comment-modal").modal("hide");
    },
  },
  components: {
    Comment,
  },
};
</script>


<style scoped>
</style>