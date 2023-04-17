import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Cities from '@/components/pages/Cities'
import Countries from '@/components/pages/Countries'
import CityDetails from '@/components/pages/CityDetails'
import CountryDetails from '@/components/pages/CountryDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cities',
      name: 'Cities',
      component: Cities
    },
    {
      path: '/countries',
      name: 'Countries',
      component: Countries
    },
    {
      path: '/city/action',
      name: 'CityDetails',
      component: CityDetails
    },
    {
      path: '/country/action',
      name: 'CountryDetails',
      component: CountryDetails
    }
  ]
})
