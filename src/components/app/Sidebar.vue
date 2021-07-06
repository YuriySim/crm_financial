<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <li v-for="link in links" :key="link.url" :class="{support: link.url==='/support'}">
      <router-link disable
        class="waves-effect waves-indigo pointer"
        active-class="active"
        :to="link.url"
      >
        <i v-if="link.url==='/support'" class="large material-icons">textsms</i>
        {{ localizeFilter(link.title) }}
      </router-link>
    </li>
  </ul>
</template>


<script>
  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  export default {
    mixins: [localizeFilterMixin],

    props: ['value'],

    data: () => ({
      links: [
        {title: 'Bill', url: '/bill'},
        {title: 'Expenses', url: '/outcome'},
        {title: 'Planning', url: '/planning'},
        {title: 'History', url: '/history'},
        {title: 'CategoriesIncome', url: '/categoriesIncome'},
        {title: 'CategoriesOutcome', url: '/categoriesOutcome'},
        {title: 'CurrencyRates', url: '/currencies'},
        {title: 'Support', url: '/support'},
      ]
    }),
  }
</script>

