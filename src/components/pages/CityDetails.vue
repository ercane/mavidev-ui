<template>
  <div>
    <h1>Add City</h1>
    <router-link to="/">Home</router-link>
    <router-link to="/cities">City List</router-link>
    <form @submit.prevent="submitForm">
      <label for="cityName">Name:</label>
      <input type="text" id="cityName" v-model="city.name" required />
      <br />
      <br />
      <label for="cityName">Code:</label>
      <input type="text" id="cityName" v-model="city.code" required />
      <br />
      <br />
      <label for="countryId">Country:</label>
      <select id="countryId" v-model="city.country.id" required>
        <option
          v-for="country in countries"
          :value="country.id"
          :key="country.id"
        >
          {{ country.name }}
        </option>
      </select>
      <br />
      <br />
      <label for="status">Status:</label>
      <select id="status" v-model="city.status" required>
        <option v-for="status in statuses" :key="status.id">
          {{ status }}
        </option>
      </select>
      <br />
      <br />
      <button type="submit">{{ buttonText }}</button>
    </form>
  </div>
</template>
  
<script>
import { get, post, put } from "../../baseRestService";
import Constants from "../util/Constants";

export default {
  data() {
    return {
      city: {
        code: "",
        name: "",
        status: "",
        country: {},
      },
      countries: [],
      cityId: null,
      isUpdateRequest: false,
      buttonText: "Ekle",
      statuses: ["ACTIVE", "PASSIVE"],
    };
  },
  methods: {
    getCountries() {
      var url = Constants.API_URL + "/country/status/ACTIVE";
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
    submitForm() {
      var body = {
        code: this.city.code,
        name: this.city.name,
        countryId: this.city.country.id,
        status: this.city.status,
      };

      if (this.isUpdateRequest) {
        body.id = this.cityId;
        var url = Constants.API_URL + "/city";
        put(
          url,
          body,
          (response) => {
            if (response.code == 1000) {
              this.$router.push("/cities");
            } else {
              alert(response.message);
            }
          },
          (error) => {
            alert(error);
          }
        );
      } else {
        var url = Constants.API_URL + "/city";
        post(
          url,
          body,
          (response) => {
            if (response.code == 1000) {
              this.$router.push("/cities");
            } else {
              alert(response.message);
            }
          },
          (error) => {
            alert(error);
          }
        );
      }
    },
  },
  mounted() {
    this.getCountries();

    this.cityId = this.$route.query.id;
    this.isUpdateRequest = this.cityId != null;
    if (this.isUpdateRequest) {
      this.buttonText = "Güncelle";
      var url = Constants.API_URL + "/city/" + this.cityId;
      get(
        url,
        (response) => {
          if (response.code == 1000) {
            this.city = response.data;
          } else {
            alert(response.message);
          }
        },
        (error) => {
          alert(error);
        }
      );
    }
  },
};
</script>
  