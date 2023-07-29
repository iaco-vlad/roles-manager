import { createStore } from 'vuex'
import jsonData from './user_roles.json';

export default createStore({
  state: {
    roles: [],
    currentRole: null,
  },
  mutations: {
    setRole(state, role) {
      state.currentRole = role;
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    addRole(state, role) {
      state.roles.push(role);
    },
    updateRole(state, updatedRole) {
      const index = state.roles.findIndex(role => role.id === updatedRole.id);
      if (index !== -1) {
        state.roles[index] = updatedRole;
      }
    },
    removeRole(state, roleId) {
      state.roles = state.roles.filter(role => role.id !== roleId);
    },
  },
  actions: {
    fetchRoles({ commit }) {
      const sessionData = sessionStorage.getItem('rolesManagerData');

      if (sessionData) {
        try {
          const rolesData = JSON.parse(sessionData);
          commit('setRoles', rolesData);
        } catch (error) {
          commit('setRoles', jsonData);
        }
      } else {
        commit('setRoles', jsonData);
      }
    },

    createRole({ commit, state }, role) {
      let lastId = 0;
      state.roles.forEach(role => {
        if (role.id > lastId) {
          lastId = role.id
        }
      })
      role.id = lastId + 1;
      commit('addRole', role);
      sessionStorage.setItem('rolesManagerData', JSON.stringify(state.roles));
    },
    updateRole({ commit, state }, role) {
      commit('updateRole', role);
      sessionStorage.setItem('rolesManagerData', JSON.stringify(state.roles));
    },

    deleteRole({ commit, state }, roleId) {
      if (window.confirm("Are you sure you want to delete this role?")) {
        commit('removeRole', roleId);
        sessionStorage.setItem('rolesManagerData', JSON.stringify(state.roles));
      }
    },

    getRole({ commit, state }, roleId) {
      const role = state.roles.find(role => role.id == roleId);
      commit('setRole', role);
      return state.currentRole;
    },
  },
  getters: {
    getRoles(state) {
      return state.roles;
    },
    getCurrentRole(state) {
      return state.currentRole;
    },
  },
})
