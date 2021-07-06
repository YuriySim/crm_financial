//Mixin generates a message if validation fails

export default {
  data() {
    return {
      message_email: '',
      message_password: '',
      message_name: '',
    }
  },

  methods: {
    validationMessages() {
      // Message for email:
      for (let error of this.v$.email.$errors) {
        if (error.$validator === 'required') {
          this.message_email = this.localizeFilterLogAndRegis('NotBeEmpty', this.locale)
        } else if (error.$validator === 'email') {
          this.message_email = this.localizeFilterLogAndRegis('EnterCorrectEmail', this.locale)
        }
      }

      if (!this.v$.email.$dirty) {
        this.message_email = this.localizeFilterLogAndRegis('NotBeEmpty', this.locale)
      }

      // Message for password:
      for (let error of this.v$.password.$errors) {
        if (error.$validator === 'required') {
          this.message_password = this.localizeFilterLogAndRegis('NotBeEmpty', this.locale)
        } else if (error.$validator === 'minLength') {
          this.message_password = `${this.localizeFilterLogAndRegis('EnterCorrectPassword', this.locale)} ${
            this.v$.password.minLength.$params.min
          } ${this.localizeFilterLogAndRegis('Symbols', this.locale)}`
        }
      }

      if (!this.v$.password.$dirty) {
        this.message_password = this.localizeFilterLogAndRegis('NotBeEmpty', this.locale)
      }

      // Message for name:
      // checking the presence of a field on the page
      if (document.getElementById('name')) {
        for (let error of this.v$.name.$errors) {
          if (error.$validator === 'required') {
            this.message_name = this.localizeFilterLogAndRegis('NotBeEmpty', this.locale)
          }
        }

        if (!this.v$.name.$dirty) {
          this.message_name = this.localizeFilterLogAndRegis('NotBeEmpty', this.locale)
        }
      }
    },
  },
}
