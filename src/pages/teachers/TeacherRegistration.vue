<template>
  <section>
    <base-card>
      <h2>Register as a Teacher now!</h2>
      <teacher-form @save-data="saveData"></teacher-form>
    </base-card>
  </section>
</template>

<script>
import TeacherForm from '../../components/teachers/TeacherForm.vue';
export default {
  components: {
    TeacherForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('teachers/registerTeacher', data);
      this.$router.replace('/teachers');
    },
  },
};
</script>
