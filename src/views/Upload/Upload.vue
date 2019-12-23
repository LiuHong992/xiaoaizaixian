<template>
  <div class="upload">
    <!-- 饿了么图片上传组件 -->
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
    <!-- vue-image-crop-upload 图片上传组件 -->
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
      // 第二个图片上传的为一个数组，可以同时传多张图片
      imgDataUrl: [],
      // 第二个图片上传框的显示状态，默认为false
      show: false,
      size: 2.1
    };
  },
  components: {
    myUpload
  },
  methods: {
    // vue-image-crop-upload组件的上传图片自带方法（显示上传图片的框）
    toggleShow() {
      this.show = !this.show;
    },
    // 第二个图片上传组件上传方法
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
  min-width: 1200px;
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