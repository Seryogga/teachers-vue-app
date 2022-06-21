<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <teacher-filter @change-filter="setFilters"></teacher-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadTeachers(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn"
            >Login to register as teacher</base-button
          >
          <base-button
            v-if="!isTeacher && !isLoading && isLoggedIn"
            link
            to="/register"
            >Register as a Teacher</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasTeachers">
          <teacher-item
            v-for="teacher in filteredTeachers"
            :key="teacher.id"
            :id="teacher.id"
            :first-name="teacher.firstName"
            :last-name="teacher.lastName"
            :rate="teacher.hourlyRate"
            :areas="teacher.areas"
          ></teacher-item>
        </ul>
        <h3 v-else>No teachers found!</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import TeacherItem from '../../components/teachers/TeacherItem.vue';
import TeacherFilter from '../../components/teachers/TeacherFilter.vue';

export default {
  components: {
    TeacherItem,
    TeacherFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        school: true,
        college: true,
        university: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    isTeacher() {
      return this.$store.getters['teachers/isTeacher'];
    },
    filteredTeachers() {
      const teachers = this.$store.getters['teachers/teachers'];
      return teachers.filter((teacher) => {
        if (this.activeFilters.school && teacher.areas.includes('school')) {
          return true;
        }
        if (this.activeFilters.college && teacher.areas.includes('college')) {
          return true;
        }
        if (
          this.activeFilters.university &&
          teacher.areas.includes('university')
        ) {
          return true;
        }
        return false;
      });
    },
    hasTeachers() {
      return !this.isLoading && this.$store.getters['teachers/hasTeachers'];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadTeachers(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('teachers/loadTeachers', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.loadTeachers();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
