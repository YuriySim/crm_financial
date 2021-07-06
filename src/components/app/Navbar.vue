<template>
  <nav class="navbar">
    <div class="nav-wrapper nav-wrapper-custom">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('clickname')">
          <i class="material-icons grey-text">dehaze</i>
        </a>
        <span class="grey-text">{{ dateFilter(this.date, localeInfo) }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger grey-text width-dropdown"
            href="#"
            data-target="dropdown"
            ref="namedropdown"
          >
            {{ nameInfo }}
            <i class="material-icons right grey-text icon-arrow">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile">
                <i class="material-icons icon-margin">account_circle</i>
                {{ localizeFilter('Profile') }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" @click.prevent="logout">
                <i class="material-icons icon-margin">assignment_return</i>
                {{ localizeFilter('LogOut') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import M from 'materialize-css'
  import datetimeMixin from '@/mixins/datetime.mixin'

  import localizeFilterMixin from '@/mixins/localizeFilter.mixin'

  export default {
    mixins: [datetimeMixin, localizeFilterMixin],

    data: () => ({
      dropdown: null,
      keytime: true, //starts updating the time every second (for datetimeMixin)
    }),

    methods: {
      async logout() {
        await this.$store.dispatch('logout')
        this.$router.push('/login?message=logout')
      },
    },

    computed: {
      nameInfo() {
        return this.$store.getters.info.name
      },

      localeInfo() {
        return this.$store.getters.info.locale
      },
    },

    mounted() {
      this.dropdown = M.Dropdown.init(this.$refs.namedropdown, {constrainWidth: true, coverTrigger: false})
    },

    beforeUnmount() {
      if (this.dropdown && this.dropdown.destroy) {
        this.dropdown.destroy()
      }
    },
  }
</script>
