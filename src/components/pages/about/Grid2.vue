<template>
  <main class="gallery">
  <h1>A peek at Space 👀</h1>
  <ul class="gallery__list">
    <li v-for="n in 90" :key="n">
      <figure>
        <img :src="'https://picsum.photos/200/300?random=1'+n" alt="Supernova Remnant G54">
      </figure>
    </li>
  </ul>
</main>
</template>

<script>
export default {
methods:{
    randomImg(max){
        return Math.floor(Math.random() * Math.floor(max))+1;
    }
}
}
</script>

<style scoped>
ul {
  list-style-type: none;
}

main.gallery {
  padding: 2rem;
}

.gallery > h1 {
  font-size: 3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin-bottom: 1rem;
  /* color: #333333; */
  font-weight: 100;
}

.gallery > .gallery__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-template-rows: repeat(6, 200px);
  grid-gap: 1rem;
  grid-auto-flow: dense;
}

/* This will create 2x images every 4 elements */
.gallery > .gallery__list > li:nth-child(4n) {
  grid-column: span 2; /* Spans two columns */
  grid-row: span 2; /* Spans two rows */
}

/* This will create 3x images every 8 elements */
.gallery > .gallery__list > li:nth-child(8n) {
  grid-column: span 3;
  grid-row: span 3;
}

.gallery > .gallery__list > li > figure {
  height: 100%;
}

.gallery > .gallery__list > li > figure > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>