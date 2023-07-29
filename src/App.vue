<template>
  <div class="container">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  margin-top: 100px;
  margin-bottom: 100px;
}

.title {
  color: gray
}

select, input {
  border: none;
  outline: none;
  background-color: transparent;
}
</style>
