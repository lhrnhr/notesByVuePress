<template>
  <div class="select_wrap" id="selectWrap">
    <select v-model="list.selected" id="selectElem">
			<option :value="value" :key="value" v-for="(text, value) in list.items">{{
				text
			}}</option>
		</select>
    <BR /><BR /> value={{ list.selected }} , text={{ list.items[list.selected] }}
		<BR /><BR />
		<button @click="list.selected = '3'">set to 3</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ],
      list: {
				selected: '2',
				items: {
					'1': 'Apple',
					'2': 'Banana',
					'3': 'Cherry',
				},
			},
    };
  }
};
</script>
<style>
.select_wrap{
  width:800px;
  margin:30px auto;
}
.select_wrap dt{
  float:left;
  width:120px;
  line-height:36px;
  text-align:right;
  font-size:14px;
}
.select_wrap dd{
  margin-left:130px;
  line-height:36px;
}
.select_wrap input[type=text],.select_wrap input[type=password]{
  height:24px;
  line-height:22px;
  padding:0 5px;
  border:1px solid #aaa;
  border-radius:2px;
}
.select_wrap .btn{
  padding:0 20px;
  color:#fff;
  cursor:pointer;
  line-height:30px;
  border:none;
  margin-right:20px;
  background:#108ee9;
}
.select_container{
  position:relative;
  display:inline-block;
}
.input_container{
  position:relative;
}
.input_container::after{
  content:"";
  position:absolute;
  top:15px;
  right:8px;
  display:inline-block; 
  height:0px;
  border:6px solid transparent;
  border-top-color:#ccc;
  pointer-events:none;
}
.input_container input{
  height:30px;
  line-height:28px;
  padding:0 5px;
  border:1px solid #aaa;
  border-radius:4px;
}
.input_container input:focus{
  border-color:#129cff;
  outline:none;
  box-shadow:0 0 6px #65bfff;
}
.select_container ul{
  position:absolute;
  top:35px;
  width:100%;
  margin:0;
  padding:0;
  background:#fff;
  border-radius:4px;
  box-shadow:0 0px 5px #ccc;
}
.select_container li{
  list-style:none;
  font-size:12px;
  line-height:30px;
  padding:0 10px;
  cursor:pointer;
}
.select_container li:hover,.select_container li.cur{
  background:#dbf0ff;
}
</style>