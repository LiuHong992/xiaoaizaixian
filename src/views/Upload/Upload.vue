<template>
  <div class="upload">
    <h3 class="htitle">支持拖拽</h3>
    <p class="ptitle">Element UI自带上传组件</p>
    <el-upload class="upload-demo" drag action="/api/upload" multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <h3 class="htitle ht">支持裁剪</h3>
     <p class="ptitle">vue-image-crop-upload</p>
    <el-button class="btn" @click="toggleShow" type="warning" icon="el-icon-picture" circle></el-button>
    <myUpload
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :height="200"
      img-format="png"
      langType="zh"
      :noRotate="false"
      field="file"
      url="/api/upload"
    ></myUpload>
    <img :src="item" v-for="(item,index) in imgDataUrl" :key="index"/>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
export default {
  data() {
    return {
      imgDataUrl: [],
      show: false,
      size: 2.1
    };
  },
  components: {
    myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl) {
      // console.log("-------- crop success --------", imgDataUrl, field);
      this.imgDataUrl.push(imgDataUrl);
    },
    //上传成功回调
    cropUploadSuccess(jsonData) {
      // console.log("-------- upload success --------");
      // console.log(jsonData);
      // console.log("field: " + field);
    },
    //上传失败回调
    cropUploadFail(status) {
      // console.log("-------- upload fail --------");
      // console.log("上传失败状态" + status);
      // console.log("field: " + field);
    }
  }
};
</script>

<style scoped lang='scss'>
.upload {
  width: 95%;
  height: 91.5%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 20px rgb(171, 173, 173);
  .htitle {
    width: 20%;
    height: 30px;
    margin-bottom: 10px;
    line-height: 30px;
    font-size: 18px;
    font-weight: 700;
  }
  .ptitle {
    width: 99%;
    height: 40px;
    margin-bottom: 20px;
    background-color: rgb(171, 173, 173);
    line-height: 40px;
    text-indent: 20px;
  }
  .btn {
    margin: 20px;
  }
  .ht{
    margin-top: 10px;
  }
}
</style>