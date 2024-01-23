<template>
  <div>
<div class="block">
  <el-timeline>
    <el-timeline-item :timestamp="time" placement="top">
      <el-card>
        <h4>更新 {{time}}</h4>
        <p>{{name}} 提交 {{content}}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
  <el-progress :percentage="percent">常识</el-progress>
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
  props:{
   time:{
      type: String
   },
   name:{
      type: String
   },
   content:{
      type: String
   },
   percent:{
      type: Number
   }
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