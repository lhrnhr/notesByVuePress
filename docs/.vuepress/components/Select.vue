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
<div class="block">
  <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
			src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    };
  }
};
</script>
<style>
.is-selected {
    color: #1989FA;
  }
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