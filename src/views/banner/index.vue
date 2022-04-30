<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-13 22:44:07
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-30 18:24:19
-->

<script setup>
import { reactive } from "vue";
import { imageUpload } from "/@/api/gameManage";
import { uploadBanner, getBanList } from "/@/api/banner";

// import { successMessage } from "/@/utils/message";

const imgArray = reactive([]);

//获取banner
getBanList(1).then(({ data }) => {
  const array = data.bannerList.map(item => {
    return item.image;
  });
  imgArray.push(...array);
});
const httpRequest = options => {
  imageUpload(options.file).then(({ data }) => {
    uploadBanner({ image: data }).then(data => {
      console.log(data);
    });
    imgArray.push(data);
  });
};
</script>

<template>
  <div class="bg-fff" style="width: 100%; height: 100%">
    <div class="box p-10">
      <el-upload
        class="upload-demo"
        :http-request="httpRequest"
        :show-file-list="false"
      >
        <el-button type="primary">点击上传</el-button>
      </el-upload>
      <div class="flex" style="flex-wrap: wrap">
        <div v-for="(item, index) in imgArray" :key="index" class="m-10">
          <div>
            <el-image
              style="width: 300px; height: 200px"
              :src="item"
              :preview-src-list="imgArray"
              :initial-index="index"
              fit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100%;
  justify-content: center;
  overflow: auto;
  .upload-demo {
    width: 70%;
    margin-bottom: 30px;
  }
}
:deep(.el-upload-list--picture .el-upload-list__item-thumbnail) {
  width: auto;
}
</style>
