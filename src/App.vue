<template lang="pug">
  #app
    button(@click="displayList=!displayList") list all students
    br
    div(v-if="displayList" id="student_list")
      span(v-for="(name, id) in Student_List" :key="id") {{id}}:{{name}}
        br
    
    #search_fun
      h3 Student ID:
      input(v-model="search_for_id" placeholder="type the id to search")
      br
      span {{search_id_result}}
      br
      br

    h3 Add new student
    form#add_new_student(action="./add" @submit.prevent="Submit_Add()")
      span Student ID:
      input(v-model.lazy="id_to_add")
      br
      span Student name:
      input(v-model.lazy="name_to_add")
      br
      button(type="submit") add new student

    h3 Delete student from list
    form#delete(action="./del" @submit.prevent="Submit_Del()")
      span Student ID:
      input(v-model.lazy="id_to_del")
      br
      button(type="submit") delete specific student
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import axios from "axios";
var Student_List = require("./assets/students.json");
export default {
  name: 'App',
  components: {
    
  }, 

  data() {
    return {
      Student_List,
      displayList: true,
      search_for_id: "",
      id_to_add: "",
      name_to_add: "",
      id_to_del: "",
    }
  },

  computed: {
    search_id_result() {
      if (this.search_for_id && this.search_for_id in this.Student_List)
        return this.Student_List[this.search_for_id];
      else
        return "student not found!";
    }
  },

  methods: {
    Submit_Add(){
      let data_to_send = {
        id_to_add: this.id_to_add,
        name_to_add: this.name_to_add
      };
      axios.post('http://localhost:2222/add', data_to_send).then((res) => {
        this.Student_List = res.data;
        // console.log(Student_List);
      }).catch((err) => {
        console.log(err);
      });
    },
    Submit_Del(){
      let data_to_send = {
        id_to_del: this.id_to_del,
      };
      axios.post('http://localhost:2222/del', data_to_send).then((res) => {
        this.Student_List = res.data;
        // console.log(Student_List);
      }).catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
