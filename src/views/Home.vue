<template>
  <div class="mainContainer">
    <nav class="start-navbar">
      <div class="nav-custom-wrapper">
        <a href="#" class="left-block"><i class="fas fa-hand-holding-usd"></i></a>

        <ul class="right-block">
          <li>
            <div class="switch">
              <label>
                RU
                <input type="checkbox" v-model="isRuLocale">
                <span class="lever"></span>
                EN
              </label>
            </div>
          </li>

          <li>
            <router-link
              v-if="!isRuLocale"
              to="/login?message=ru-RU"
              class="waves-effect waves-light btn"
            >
              Войти
            </router-link>

            <router-link
              v-else
              to="/login?message=en-US"
              class="waves-effect waves-light btn"
            >
              Login
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="start-main">
      <div class="row width-row" v-if="!isRuLocale">
        <div class="col s12 m12 l2 offset-l3 xl2 offset-xl3 start-col">
          <i class="fas fa-hand-holding-usd"></i>
        </div>

        <div class="col s12 m12 l5 offset-l1 xl5 offset-xl1">
          <p>
            <i>FinanceControl</i>  это простой и понятный сервис управления расходами и доходами, который поможет вам правильно планировать бюжет.
          </p>
        </div>

        <div class="col s12 start-button">
          <router-link
            to="/register?message=ru-RU"
            class="waves-effect waves-light btn"
          >
            Начать
          </router-link>
        </div>

        <div class="col s12">
          <ul>
            <li class="discrip">
              <strong>НАГЛЯДНЫЕ РАСХОДЫ</strong> - Записывайте все траты в течении дня, и сервис покажет Вам, куда ушли Ваши деньги на понятном графике.
            </li>

            <li class="discrip">
              <strong>ПЛАНИРОВАНИЕ БЮДЖЕТА</strong> - Вы сможете легко и быстро планировать расходы и доходы, что поможет не совершать случайных покупок.
            </li>

            <li class="discrip">
              <strong>УЧЕТ ДОЛГОВ И СБЕРЕЖЕНИЙ</strong> - Держите баланс всех Ваших счетов под контролем и эффективно достигайте финансовых целей.
            </li>

            <li class="discrip">
              <strong>МУЛЬТИВАЛЮТНОСТЬ</strong> - Автоматически обновляемые курсы валют позволят поддерживать Ваши финансы в актуальном состоянии.
            </li>
          </ul>
        </div>
      </div>

      <div class="row width-row" v-else>
        <div class="col s12 m12 l2 offset-l3 xl2 offset-xl3 start-col">
          <i class="fas fa-hand-holding-usd"></i>
        </div>

        <div class="col s12 m12 l5 offset-l1 xl5 offset-xl1">
          <p>
            <i>FinanceControl</i>  is a simple expense and income management service that will help you plan your budget correctly.
          </p>
        </div>

        <div class="col s12 start-button">
          <router-link
            to="/register?message=en-US"
            class="waves-effect waves-light btn"
          >
            Start
          </router-link>
        </div>

        <div class="col s12">
          <ul>
            <li class="discrip">
              <strong>VISUAL EXPENSE</strong> - Write down all your expenses during the day, and the service will show you where your money went on an understandable schedule.
            </li>

            <li class="discrip">
              <strong>BUDGET PLANNING</strong> - You can easily and quickly plan your expenses and income, which will help you avoid making accidental purchases.
            </li>

            <li class="discrip">
              <strong>DEBT AND SAVINGS ACCOUNTING</strong> - Keep the balance of all your accounts under control and effectively achieve your financial goals.
            </li>

            <li class="discrip">
              <strong>MULTI-CURRENCY</strong> - Automatically updated currency rates will keep your finances up to date.
            </li>
          </ul>
        </div>
      </div>
    </main>

    <footer>
      <p v-if="!isRuLocale">
        Все права защищены © 2020-2021 YS Portfolio
      </p>

      <p v-else>
        All rights reserved © 2020-2021 YS Portfolio
      </p>
    </footer>
  </div>
</template>

<script>
  import { useMeta } from 'vue-meta'

  export default {
    name: 'home',

    setup () {
      useMeta({ title: 'Home' })
    },

    data () {
      return {
        isRuLocale: false,
      }
    },
  }
</script>
