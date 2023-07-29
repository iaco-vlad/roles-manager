<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <h2 v-if="isEditMode" class="title">Edit Role</h2>
        <h2 v-else class="title">Create New Role</h2>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-form @submit="submitForm">
          <b-form-group label="Role Name">
            <b-form-input v-model="role.name"></b-form-input>
          </b-form-group>

          <b-form-group label="Role Type">
            <b-form-select v-model="role.type" :options="roleTypes"></b-form-select>
          </b-form-group>

          <b-form-group label="Role Description">
            <b-form-textarea v-model="role.description"></b-form-textarea>
          </b-form-group>

          <b-form-group label="Editable">
            <b-form-checkbox v-model="role.editable"></b-form-checkbox>
          </b-form-group>

          <b-form-group label="Active">
            <b-form-checkbox v-model="role.active"></b-form-checkbox>
          </b-form-group>

          <b-button type="submit" variant="primary">{{ isEditMode ? 'Update Role' : 'Create Role' }}</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      role: {
        name: '',
        type: '',
        description: '',
        editable: false,
        active: false,
        // TODO: Add logic for adding users.
      },
      roleTypes: [
        { text: 'Administrator', value: 'admin' },
        { text: 'Job Administrator', value: 'job_admin' },
      ]
    };
  },
  computed: {
    ...mapGetters(['getRoles', 'getCurrentRole']),
    isEditMode() {
      return this.$route.name === 'edit';
    },
  },
  methods: {
    ...mapActions(['fetchRoles', 'createRole', 'updateRole', 'getRole']),

    submitForm(e) {
      e.preventDefault();
      this.role.modified_on = this.getNow();
      if (this.isEditMode) {
        this.updateRole(this.role);
      } else {
        this.createRole(this.role);
      }
      this.$router.push('/');
    },
    getNow() {
      const currentDate = new Date();

      const year = currentDate.getUTCFullYear();
      const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getUTCDate()).padStart(2, '0');
      const hours = String(currentDate.getUTCHours()).padStart(2, '0');
      const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
      const milliseconds = String(currentDate.getUTCMilliseconds()).padStart(3, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    }
  },
  async created() {
    this.fetchRoles();
    if (this.isEditMode) {
      this.getRole(this.$route.params.id);
    }
  },
  watch: {
    getCurrentRole(newVal) {
      // TODO: Make the data fully dynamic
      this.role = newVal;
    }
  }
};
</script>
