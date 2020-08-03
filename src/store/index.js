import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosStore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    profile: {},
    blogs: [],
    activeBlog: {},
    comments: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBlogs(state, blogs) {
      state.blogs = blogs
    },
    setActiveBlog(state, blog) {
      state.activeBlog = blog
    },
    setComments(state, comments) {
      state.comments = comments
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBlogs({ commit, dispatch }) {
      try {
        let res = await api.get("blogs")
        commit("setBlogs", res.data)
      } catch (error) {
        console.log(error);
      }
    },
    async getBlog({ commit, dispatch }, blogId) {
      try {
        let res = await api.get("blogs/" + blogId)
        commit("setActiveBlog", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async addBlog({ commit, dispatch, state }, blogData) {
      try {
        let res = await api.post("blogs", blogData)
        dispatch("getBlogs")
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBlog({ commit, dispatch, state }, blogId) {
      try {
        if (state.profile.email == state.activeBlog.blog.creatorEmail) {
          let res = await api.delete("blogs/" + blogId);
          router.push({ name: 'Blogs' })
          commit("setActiveBlog", {})
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getComments({ commit, dispatch }, blogId) {
      try {
        let res = await api.get("blogs/" + blogId)
        commit("setComments", res.data.comments)
      } catch (error) {
        console.error(error);
      }
    },
    async addComment({ commit, dispatch, state }, commentData) {
      try {
        let res = await api.post("comments", commentData)
        // dispatch("getComments")
        commit("setComments", [...state.comments, res.data])
      } catch (error) {
        console.error(error);
      }
    },
    //needs both commentId and blogId (could pass whole commentObject)
    async deleteComment({ commit, dispatch, state }, comment) {
      try {
        let res = await api.delete("comments/" + comment.id);
        commit("setComments")
        dispatch("getComments", comment.blogId)
        // get comments , dispatch with comment.blog.id
      } catch (error) {
        console.error(error);
      }
    },
    async updateComment({ commit }, updatedComment) {
      try {
        let res = await api.put("comments/" + updatedComment.id, updatedComment)
        commit("setComments", res.data)
      } catch (error) {
        console.error(error);
      }
    }
  }
});
