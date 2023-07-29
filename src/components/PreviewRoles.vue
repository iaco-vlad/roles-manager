<template>
  <div class="preview-roles">
    <h2 class="title">User Roles Management</h2>

    <b-container>
      <b-row class="mb-2">
        <b-col>
          <label for="search"></label>
          <b-input-group class="custom-input">
            <b-form-input id="search" v-model="searchFilter" placeholder="search"></b-form-input>
            <b-input-group-append>
              <font-awesome-icon class="p-1 mt-1" :icon="['fas', 'magnifying-glass']" />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col>
          <label for="status">Role Status</label>
          <b-input-group class="custom-input">
            <b-form-select id="status" v-model="statusFilter" :options="statusOptions" ></b-form-select>
          </b-input-group>
        </b-col>
        <b-col class="text-right">
          <b-button @click="goToCreateRole" squared variant="info" class="create-button mt-4">CREATE NEW ROLE</b-button>
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col md="4" sm="6" xs="12" v-for="role in filteredRoles" :key="role.id" class="mt-3">
          <b-card
              no-body
              class="mb-2"
          >
            <div class="card-body-wrapper px-4">

              <span class="inactive-flag" v-if="!role.active">INACTIVE</span>

              <br>
              <br>
              <br>

              <b-card-body>
                <b-card-title>{{ role.name }}</b-card-title>
                <h5 class="grey-text">{{ formatType(role.type) }}</h5>

                <b-card-text class="mt-5">{{ formatDescription(role.description) }}</b-card-text>
              </b-card-body>

              <div class="px-3 mt-2">
                <span class="image-preview-circle" v-for="user in role.users" :key="user.id" >
                  <img :src="user.photo_url" :alt="user.first_name + ' ' + user.last_name" class="rounded-circle">
                </span>
              </div>

              <br>
              <br>
              <br>

            </div>

            <b-card-footer class="px-5">
              <span class="grey-text">Last update: {{ formatDate(role.modified_on) }}</span>

              <div class="actions-wrapper">
                <template v-if="role.editable">
                  <b-button @click="goToEditRole(role.id)" variant="link" class="edit-button">EDIT</b-button>
                  <b-button @click="deleteRole(role.id)" variant="link delete-button">DELETE</b-button>
                </template>

                <font-awesome-icon class="p-2 mt-1 grey-text" v-else :icon="['fas', 'lock']" />
              </div>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchFilter: '',
      statusFilter: '',
      statusOptions: [
        { value: 'all', text: 'Active and Inactive' },
        { value: 'active', text: 'Active' },
        { value: 'inactive', text: 'Inactive' },
      ],
    };
  },
  computed: {
    ...mapGetters(['getRoles']),
    filteredRoles() {
      console.log(this.getRoles)
      let roles = this.getRoles;
      if (this.statusFilter === 'active') {
        roles = roles.filter(item => item.active === true)
      }
      if (this.statusFilter === 'inactive') {
        roles = roles.filter(item => item.active === false)
      }
      if (this.searchFilter) {
        roles = roles.filter(item => item.name.toLowerCase().includes(this.searchFilter.toLowerCase()))
      }
      return roles
    },
  },
  methods: {
    ...mapActions(['fetchRoles', 'deleteRole']),
    goToCreateRole() {
      this.$router.push('/create')
    },
    goToEditRole(roleId) {
      this.$router.push(`/edit/${roleId}`)
    },
    formatDate(dateString) {
      const date = new Date(dateString);

      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();

      return `${day}/${month}/${year}`;
    },
    formatType(type) {
      switch (type) {
        case 'admin':
          return 'Administrator Role'
        case 'job_admin':
          return 'Job Administrator Role'
        default:
          return ''
      }
    },
    formatDescription(text) {
      if (text.length < 102) {
        return text;
      }
      return text.substring(0, 100) + '...'
    }
  },
  created() {
    this.fetchRoles();
  },
};
</script>

<style scoped>
.preview-roles {
  position: relative;
}

input {
  border: none;
  padding: 5px;
}
.custom-input {
  border-bottom: 2px solid cyan;
}
.create-button {
  position: absolute;
  right: 0;
  color: white;
}
span.inactive-flag {
  display: block;
  position: absolute;
  right: 0;
  background-color: red;
  color: white;
  margin-top: 30px;
  margin-right: 30px;
  padding: 8px 12px;
  border-radius: 8px;
}

.image-preview-circle {
  display: inline-block;
  padding: 5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.image-preview-circle img {
  width: 100%;
}

.grey-text {
  color: gray;
}

.card {
  border-radius: 0;
}

.card .card-footer {
  position: relative;
  border: 0;
  padding-bottom: 20px;
  padding-top: 20px;
}

.actions-wrapper {
  position: absolute;
  top: 12px;
  right: 20px;
}

.delete-button {
  font-weight: 800;
  color: red;
}
.edit-button {
  font-weight: 800;
  color: black;
}
</style>
