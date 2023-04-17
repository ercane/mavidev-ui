<template>
  <div>
    <h1>Country List</h1>
    <router-link to="/">Home</router-link>
    <router-link to="/country/action">Add Country</router-link>
    <!-- Ülke Ekle butonu -->
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Phone Code</th>
          <th>Name</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in countries" :key="country.id">
          <td>{{ country.code }}</td>
          <td>{{ country.phoneCode }}</td>
          <td>{{ country.name }}</td>
          <td>{{ country.status }}</td>
          <td>
            <button v-on:click="updateCountry(country)">Edit</button>
            <span>-</span>
            <button v-on:click="deleteCountry(country)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import { get,del } from "../../baseRestService";
import Constants from "../util/Constants";

export default {
  data() {
    return {
      countries: [],
    };
  },
  mounted() {
    this.fetchCountries();
  },
  methods: {
    fetchCountries() {
      var url = Constants.API_URL + "/country";
      get(
        url,
        (response) => {
          if (response.code == 1000) {
            this.countries = response.data;
          } else {
            alert(response.message);
          }
        },
        (error) => {
          alert(error);
        }
      );
    },
    addCountry() {
      this.$router.push("/country/action");
    },
    updateCountry(country) {
      this.$router.push("/country/action?id=" + country.id);
    },
    deleteCountry(country) {
      var url = Constants.API_URL + "/country/" + country.id;
      del(
        url,
        null,
        (response) => {
          if (response.code == 1000) {
            this.fetchCountries();
          } else {
            alert(response.message);
          }
        },
        (error) => {
          alert(error);
        }
      );
    },
  },
};
</script>
  