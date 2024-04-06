<template>
  <div>
    <NuxtPage />
  </div>
</template>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  background-color: transparent;
  width: 100%;
  height: 100%;
  max-width: 250px;
  max-height: 250px;
  user-select: none;
  overflow: hidden;
  border-radius: 12px;
  font-size: 14px;
}

#__nuxt {
  font-family: sans-serif;
  background-color: rgba(#9a0000, .6);
  border: 2px solid rgba(#d50000, .5);
  color: #fff;
  padding: 10px
}
</style>
