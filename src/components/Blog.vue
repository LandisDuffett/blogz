<template>
  <div class="car col-12 border rounded mb-3 square" @click="moveToBlogPage">
    <!-- add router link dynamically -->
    <div class="row">
      <router-link :to="{name: 'Blog', params: {id: blogData._id}}">
        <h5 class="ml-2">"{{blogData.title}}"</h5>
      </router-link>
    </div>
    <div class="row">
      <h5 class="ml-2">author: {{blogData.creatorEmail}}</h5>
    </div>
  </div>
</template>


<script>
export default {
  name: "blog",
  props: ["blogData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    moveToBlogPage() {
      this.$router.push({ name: "Blog", params: { id: this.blogData._id } });
    },
  },
  components: {},
};
</script>


<style scoped>
</style>