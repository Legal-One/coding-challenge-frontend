<template>
    <div id="nav">
        <router-link to="/">All Calls</router-link>
    </div>

    <router-view #default="{ Component }">
        <transition name="slide-left-fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();

        return {
            route,
        };
    },

    provide() {
        return {
            route: 'hjhjh',
        };
    },
};
</script>

<style>
:root {
    --color-red: #fa4344;
    --color-yellow: #faf743;
    --color-light-blue: #3d59fa;
    --color-purple: #a920cb;
    --color-green: #00a079;
    --color-blue: #113264;
    --color-black: #495057;
    --color-grey: #e5e5e5;
    --color-white: #ffffff;

    --box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.1);
    --box-shadow-2: 0px 1px 15px rgba(63, 63, 68, 0.15);

    --font-title: 2.2rem;
    --font-sub-title: 1.6rem;

    --xs: 600px;
    --sm: 601px;
    --md: 768px;
    --lg: 992px;
    --xl: 1200px;
}

html {
    box-sizing: border-box;
    /* // broweser default = 16px
  // 10px / 16px = 62.5%
  // so that 10px = 1rem */
    font-size: 62.5%;
}

* {
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after {
    box-sizing: inherit;
}

body {
    height: 100vh;
    width: 100%;
}

img {
    width: 100%;
    height: 100%;
}

.chart {
    box-shadow: var(--box-shadow);
    flex: 1;

    padding: 1rem;
    margin-left: 3rem;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    display: flex;
    justify-content: center;

    padding: 30px;
    margin-bottom: 3rem;
    width: 100%;

    box-shadow: var(--box-shadow);
}

@media screen and (min-width: 768px) {
    #nav {
        justify-content: flex-end;
    }
}

#nav a {
    font-weight: bold;
    color: #2c3e50;

    font-size: var(--font-sub-title);
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.bg-purple {
    background: var(--color-purple);
    color: var(--color-white);
}

.bg-red {
    background: var(--color-red);
    color: var(--color-white);
}

.bg-green {
    background: var(--color-green);
    color: var(--color-white);
}

.bg-blue {
    background: var(--color-blue);
    color: var(--color-white);
}

.bg-yellow {
    background: var(--color-yellow);
    color: var(--color-black);
}

.color-green {
    color: var(--color-green);
}

.stats {
    display: flex;
    justify-content: center;
}

.stat {
    font-size: var(--font-title);

    margin: 2rem;
    padding: 2rem 4rem;
    box-shadow: var(--box-shadow);

    border-radius: 1rem;
}

.stat-heading {
    font-size: var(--font-sub-title);
    font-weight: 600;
    color: var(--color-purple);

    margin-bottom: 1rem;
}

.slide-left-fade-enter {
    opacity: 0;
    transform: translateX(30px);
}

.slide-left-fade-enter-active,
.slide-left-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-left-fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
