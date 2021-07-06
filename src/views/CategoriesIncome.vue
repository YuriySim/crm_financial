<template>
  <div class="page-title">
    <h3>{{ localizeFilter('CategoriesIncome') }}</h3>
  </div>

  <section>
    <Loader v-if="loading" />

    <div v-else class="row">
      <CategoryCreate @addCategory="addCategory" />

      <CategoryEdit
        :categories="categories"
        :records="records"
        :uncategorizedId="uncategorizedId"
        :key="categories.length + updateCount"
        @updateCategory="updateCategory"
        @removeCategory="removeCategory"
      />
    </div>
  </section>
</template>

<script>
  import CategoryCreate from '@/components/app-categories-income/CategoryCreate.vue'
  import CategoryEdit from '@/components/app-categories-income/CategoryEdit.vue'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'categoriesIncome',

    setup () {
      useMeta({ title: 'Income Categories' })
    },

    mixins: [localizeFilterMixin],

    data () {
      return {
        loading: true,
        categories: [],
        records: [],
        updateCount: 0,
        uncategorizedId: '',
      }
    },

    methods: {
      addCategory(newCategory) {
        this.categories.push(newCategory)
      },

      updateCategory(formDataTwo) {
        for (var category of this.categories) {
          if (category.id === formDataTwo.idCategory) {
            category.titleCategory = formDataTwo.titleCategory
            this.updateCount++
          }
        }
      },

      removeCategory(formDataOne) {
        for (var [idx, category] of this.categories.entries()) {
          if (category.id === formDataOne.idCategory) {
            this.categories.splice(idx, 1)
          }
        }
      },
    },

    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories', {directory: 'income'})

      this.records = await this.$store.dispatch('fetchRecords', {directory: 'income'})

      for (var category of this.categories) {
        if (category.titleCategory === 'Без категории') {
          this.uncategorizedId = category.id
          this.categories.shift()
        }
      }

      this.loading = false
    },


    components: {
      CategoryCreate,
      CategoryEdit,
    },
  }
</script>
