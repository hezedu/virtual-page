
<template>
<div style="padding-top: 8%; text-align: center;">
  <h1>History Navigation Vue</h1>
  <h2>Page Not Found</h2>
  <!-- <p>"{{$page.route.fullPath}}"</p> -->
  <br />
  <navigator style="text-decoration: underline;" type="back" v-if="$page.stateKey > 1">Back</navigator>
  <br />
  <br />
</div>
</template>
<script>
export default {
  data(){
    return {
    }
  }
}
</script>
