<template>
  <div class="page-title">
    <h3>{{ localizeFilter('CategoriesOutcome') }}</h3>
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
  import CategoryCreate from '@/components/app-categories-outcome/CategoryCreate.vue'
  import CategoryEdit from '@/components/app-categories-outcome/CategoryEdit.vue'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  import { useMeta } from 'vue-meta'

  export default {
    name: 'categoriesOutcome',

    setup () {
      useMeta({ title: 'Expense Categories' })
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
            category.limitCategory = formDataTwo.limitCategory
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
      this.categories = await this.$store.dispatch('fetchCategories', {directory: 'outcome'})

      this.records = await this.$store.dispatch('fetchRecords', {directory: 'outcome'})

      for(var category of this.categories) {
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

