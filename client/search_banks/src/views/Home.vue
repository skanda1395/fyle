<template>
  <div class="container">
    <!-- Page Title -->
    <div id="title">
      <h1 class="blue-text center-align">Bank Branches</h1>
    </div>

    <!-- Filters -->
    <div id="filters">
      <p>Selected City: {{ selected_city }}</p>
      <div class="row">
        <div class="col s12 m3">
          <!-- Dropdown -->
          <div class="input-field">
            <select v-model="selected_city">
              <option value="" disabled>Choose your option</option>
              <option value="BANGALORE" selected>Bangalore</option>
              <option value="CHENNAI">Chennai</option>
              <option value="DELHI">Delhi</option>
              <option value="MUMBAI">Mumbai</option>
              <option value="VIZAG">Vizag</option>
            </select>
            <label>Choose City</label>
          </div>
        </div>
        <div class="col s12 m8 offset-m1">
          <!-- Search -->
          <div class="input-field">
            <i class="material-icons prefix">search</i>
            <input id="icon_prefix" type="text" class="validate" />
            <label for="icon_prefix">Search Banks...</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Banks List -->
    <div id="banks_list" class="section">
      <table class="responsive-table highlight">
        <thead>
          <tr>
            <th>Bank ID</th>
            <th>IFSC Code</th>
            <th>Address</th>
            <th>City</th>
            <th>District</th>
            <th>State</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Alvin</td>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Alvin</td>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alvin</td>
            <td>Alvin</td>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
            <td>$0.87</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected_city: "BANGALORE",
      banks_list: null,
    };
  },
  mounted() {
    // Fetch All Banks in the selected city (Default => Bangalore)
    console.log("Querying DB!");
    fetch(
      `https://indian-banks-api.herokuapp.com/branches/autocomplete?q=${this.selected_city}`
    )
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  },
};
</script>
