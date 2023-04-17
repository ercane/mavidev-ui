<template>
  <div>
    <h1>Cities</h1>
    <router-link to="/">Home</router-link>
    <router-link to="/city/action">Add City</router-link>
    <table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Country</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="city in cities" :key="city.id">
          <td>{{ city.code }}</td>
          <td>{{ city.name }}</td>
          <td>{{ city.country.name }}</td>
          <td>{{ city.status }}</td>
          <td>
            <button v-on:click="updateCity(city)">Düzenle</button>
            <span>-</span>
            <button v-on:click="deleteCity(city)">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import { get, del } from "../../baseRestService";
import Constants from "../util/Constants";

export default {
  data() {
    return {
      cities: [], // Şehir listesi veri kaynağı
    };
  },
  mounted() {
    this.fetchCities();
  },
  methods: {
    fetchCities() {
      var url = Constants.API_URL + "/city";
      get(
        url,
        (response) => {
          if (response.code == 1000) {
            this.cities = response.data;
          } else {
            alert(response.message);
          }
        },
        (error) => {
          alert(error);
        }
      );
    },
    addCity() {
      this.$router.push("/city/action");
    },
    updateCity(city) {
      this.$router.push("/city/action?id=" + city.id);
    },
    deleteCity(city) {
      var url = Constants.API_URL + "/city/" + city.id;
      del(
        url,
        null,
        (response) => {
          if (response.code == 1000) {
            this.fetchCities();
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
  