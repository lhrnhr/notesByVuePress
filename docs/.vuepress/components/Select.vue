<template>
  <div>
   <select class="cs-skin-underline">

					<option value="" disabled selected>Choose a Bouquet</option>

					<option value="1">Gardenia + Daisies</option>

					<option value="2">Roses + Stephanotis</option>

					<option value="3">Peony + Gerbera</option>

					<option value="4">Orchid + Limonium</option>

					<option value="5">Iris + Omithoalum</option>

		</select>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>
<style>
.cs-skin-underline{
  font-family: 'icomoon';
	content: '\e003';
	right: 0.25em;
	-webkit-transform: translate3d(0,-50%,0) rotate3d(0,0,1,45deg);
	transform: translate3d(0,-50%,0) rotate3d(0,0,1,45deg);
	-webkit-transition: -webkit-transform 0.5s;
	transition: transform 0.5s;
}
</style>