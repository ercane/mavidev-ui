<template>
  <div>
    <h1>Ülke Ekle</h1>
    <router-link to="/">Home</router-link>
    <router-link to="/countries">Country List</router-link>
    <form @submit.prevent="submitForm">
      <label for="code">Code:</label>
      <input type="text" id="code" v-model="country.code" required />
      <br />
      <br />
      <label for="name">Phone Code:</label>
      <input type="text" id="name" v-model="country.phoneCode" required />
      <br />
      <br />
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="country.name" required />
      <br />
      <br />
      <label for="status">Status:</label>
      <select id="status" v-model="country.status" required>
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
      country: {
        code: "",
        name: "",
        phoneCode: "",
        status: "",
      },
      countryId: null,
      isUpdateRequest: false,
      buttonText: "Ekle",
      statuses: ["ACTIVE", "PASSIVE"],
    };
  },
  methods: {
    submitForm() {
      var body = {
        code: this.country.code,
        name: this.country.name,
        phoneCode: this.country.phoneCode,
        status: this.country.status,
      };

      if (this.isUpdateRequest) {
        body.id = this.countryId;
        var url = Constants.API_URL + "/country";
        put(
          url,
          body,
          (response) => {
            if (response.code == 1000) {
              this.$router.push("/countries");
            } else {
              alert(response.message);
            }
          },
          (error) => {
            alert(error);
          }
        );
      } else {
        var url = Constants.API_URL + "/country";
        post(
          url,
          body,
          (response) => {
            if (response.code == 1000) {
              this.$router.push("/countries");
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
    this.countryId = this.$route.query.id;
    this.isUpdateRequest = this.countryId != null;
    if (this.isUpdateRequest) {
      this.buttonText = "Güncelle";
      var url = Constants.API_URL + "/country/" + this.countryId;
      get(
        url,
        (response) => {
          if (response.code == 1000) {
            this.country = response.data;
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
  