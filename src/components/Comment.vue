<template>
  <div class="car col-3 border rounded mb-3 bg-info" @click="moveToBlogPage">
    <!-- add router link dynamically -->
    <router-link :to="{name: 'Blog', params: {id: commentData.blogId}}">
      <h3>{{commentData.creatorEmail}}</h3>
    </router-link>
    <h3>{{commentData.body}}</h3>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["commentData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    moveToBlogPage() {
      this.$router.push({
        name: "Comment",
        params: { id: this.commentData.blogId },
      });
    },
  },
  components: {},
};
</script>


<style scoped>
</style>