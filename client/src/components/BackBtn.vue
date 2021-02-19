<template>
  <div class="container">
    <router-link :to="path" v-if="path">
      <img :src="backIcon" alt="back-arrow" />
      {{ name }}
    </router-link>
  </div>
</template>

<script>
import backIcon from '@/assets/arrow-back.svg'

export default {
  name: 'BackBtn',
  props: {
    path: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      backIcon
    }
  }
}
</script>

<style scoped>
.container,
a {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #333333;
  font-size: 100%;
  font-weight: bold;
  text-transform: capitalize;
}
.container {
  margin-bottom: 20px;
}
.container a {
  height: 40px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  margin-right: 40px;
  background-color: #ffffff;
  padding: 0 10px;
  transition: 0.5s ease-in-out;
}
.container a:hover {
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12);
}
a:link {
  color: inherit;
}
a:active {
  color: inherit;
}
a:visited {
  color: inherit;
}
.container a img {
  height: 30px;
  margin-right: 5px;
}
.container h2 {
  font-size: 150%;
  font-weight: 600;
  color: #4f4f4f;
}
</style>
