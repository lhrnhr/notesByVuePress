<template>
  <div>
<el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item key="1月22日">
      1月22日学习时长<el-rate v-model="value1" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
    </el-carousel-item>
    <el-carousel-item key="1月23日">
      1月23日学习时长<el-rate v-model="value2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
    </el-carousel-item>
    <el-carousel-item key="1月24日">
      1月24日学习时长<el-rate v-model="value3" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
			 value1: 5,
			 value2: 4,
       value3: 5
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
.el-carousel__item h3 {
    color: #bfa;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #bfa;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #85FFBD;
background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
  }
.like {
    cursor: pointer;
    font-size: 25px;
    display: inline-block;
  }
  
</style>