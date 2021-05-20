<template>
  <div>
    <router-view />
  </div>
</template>

<style></style>

<script>
import M from "materialize-css";

export default {
  mounted() {
    // Initialize Dropdown
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  },
};
</script>
