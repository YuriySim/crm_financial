<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ localizeFilter('Amount') }}</th>
        <th>{{ localizeFilter('Date') }}</th>
        <th>{{ localizeFilter('Category') }}</th>
        <th v-if="width > 500">{{ localizeFilter('Type') }}</th>
        <th>{{ localizeFilter('Details') }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 + (numberPage - 1) * pageSize}}</td>
        <td>{{ record.amount }} {{ generatorIconCurrency() }}</td>
        <td>{{ dateFilter(record.date, localeInfo, 'date') }}</td>
        <td>{{ record.titleCategory }}</td>
        <td v-if="width > 500">
          <span v-if="record.key" class="badge green" >
            {{ localizeFilter('Income') }}
          </span>
          <span v-else class="badge red">
            {{ localizeFilter('Expense') }}
          </span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import datetimeMixin from '@/mixins/datetime.mixin'
  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'
  import accountCurrencyMixin from '@/mixins/accountCurrency.mixin'

  export default {
    mixins: [
      datetimeMixin,
      localizeFilterMixin,
      accountCurrencyMixin,
    ],

    props: {
      records: {
        required: true,
        type: Array,
      },

      numberPage: {
        required: true,
      },

      pageSize: {
        required: true,
      },
    },

    data () {
      return {
        width: 0,
      }
    },

    methods: {
      updateWidth() {
        this.width = window.innerWidth;
      },
    },

    mounted() {
      this.updateWidth()
    },

    created() {
      window.addEventListener('resize', this.updateWidth);
    },
  }
</script>
