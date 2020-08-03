<template>
  <div class="active-blog fontchange">
    <div class="car col-10 border my-3 rounded ml-3 mb-3 square">
      <h5>Title: {{blog.blog.title}}</h5>
      <img class="img-fluid" :src="blog.blog.imgUrl" />
      <h5 class="bg-info text-light pl-2">{{blog.blog.body}}</h5>
    </div>
    <div>
      <button
        type="button"
        class="col-4 my-1 ml-3 btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#comment-modal"
      >Add Comment</button>
    </div>
    <div>
      <button
        type="button"
        class="col-4 my-1 ml-3 btn btn-primary btn-lg"
        @click="deleteBlog"
      >Delete Blog</button>
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
                <div class="form-group row justify-content-center">
                  <label for="inputName" class="col-sm-1-12 col-form-label"></label>
                  <div class="col-sm-1-12">
                    <textarea
                      type="text"
                      class="form-control"
                      name="title"
                      id="inputName"
                      placeholder="Enter comment here..."
                      cols="30"
                      v-model="newComment.body"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-sm-4 col-sm-10">
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
    <div>
      <div class="grid-item">
        <p
          v-for="comment in comments"
          :key="comment.id"
          class="car col-10 border rounded mb-3 square bg-info text-light"
        >
          Comment: {{comment.body}}
          <button
            type="button"
            class="col-4 my-1 ml-3 btn btn-primary btn-lg"
            @click="deleteComment(comment.id)"
          >Delete</button>
        </p>
      </div>
    </div>
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
      this.newComment.blogId = this.blog.blog.id;
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {};
      $("#comment-modal").modal("hide");
    },
    deleteBlog() {
      this.$store.dispatch("deleteBlog", this.blog.blog.id);
    },
    deleteComment(commentId) {
      this.$store.dispatch("deleteComment", commentId);
    },
  },
  components: {
    Comment,
  },
};
</script>


<style scoped>
</style>