<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
 export default {
     name: 'App',
 }
</script>

<style>
 :root {
     --main-color: #495159;
     --background-color: #e5d4c0;
     --foreground-color: #c5decd;
     --pink: #fac9b8;
     --blue: #72f1de;
 }
 #app {
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
 }

 @media screen and (min-width: 1200px){
     body{
         margin-left: 15%;
         margin-right: 15%;
     }
     div.content{
         margin-left: 10%;
     }
 }
 body{
     background-color: var(--background-color);
     color: var(--main-color);
     font-size: 1em;
 }
 h1{
     margin-top:0.5em;
     margin-bottom: .5em;
 }

 hr.mysplit-color {
     border: 0;
     margin-top: 0;
     margin-bottom: 1em;
     height: 2px;
     background-image: linear-gradient(to right, transparent, var(--pink) 10%, var(--pink) 90%, transparent 100%);

 }

 input[type="text"], input[type='password']{
     outline: none;
     margin: 0.2em 0.1em;
     padding: 0.5em;
     height: 2em;
     border-radius: 10px;
     border: 1px solid var(--foreground-color);
 }

 input[type="button"]{
     outline: none;
     height: 2em;
     border-radius: 1em;
     border:none;
     text-align: center;
     color: var(--main-color);
 }
</style>
