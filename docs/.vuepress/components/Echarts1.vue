<template>
  <div>
<div class="block">
  <el-timeline>
    <el-timeline-item timestamp="2024/01/22" placement="top">
      <el-card>
        <h4>更新 1月 22日</h4>
        <p>lhr 提交于 2024/01/22 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  <el-progress :percentage="1">常识</el-progress>
</div>


  </div>
</template>

<script>
export default {
  data() {
    return {
			num: 1,
    };
  },
   methods: {
      handleChange(value) {
        console.log(value);
      }
    }
};
</script>
<style>
.is-selected {
    color: #1989FA;
  }
</style>