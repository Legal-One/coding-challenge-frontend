<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div>
    <router-view />
</template>

<script>
export default {
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

    font-family: Roboto;
    --webkit-font-smoothing: antialiased;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}


</style>
