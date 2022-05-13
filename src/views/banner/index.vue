<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-13 22:44:07
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 21:04:15
-->
<script>
import { imageUpload } from "/@/api/gameManage";
import { uploadBanner, getBanList } from "/@/api/banner";
import { getGame } from "/@/api/gameManage";
import { storageSession } from "/@/utils/storage";
import { successMessage } from "/@/utils/message";
export default {
  data() {
    return {
      headerStyle: { "background-color": "rgba(0,0,0,0.05)" },
      data: [],
      page: 1,
      total: 0,
      limit: 10,
      pictureIndex: 0,
      pictureShow: false,
      addData: {
        image: "",
        name: "",
        manager_name: "",
        game_id: "",
        manager_id: ""
      },
      rules: {
        image: {
          required: true,
          message: "请上传海报"
        },
        name: {
          required: true,
          message: "请选择比赛"
        }
      },
      dialogVisible: false,
      options: []
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    fileList() {
      return this.addData.image ? [{ url: this.addData.image }] : [];
    },
    pictureList() {
      return this.data.map(item => {
        return item.image;
      });
    }
  },
  methods: {
    getData() {
      getBanList(this.page).then(({ data }) => {
        this.data = data.bannerList;
        this.total = data.total;
        this.limit = data.limit;
      });
    },
    httpRequest(options) {
      imageUpload(options.file).then(({ data }) => {
        this.addData.image = data;
      });
    },
    timeFormat(time) {
      return time.replace(/T/g, " ").replace(/\.[\d]{6}Z/g, "");
    },
    pictureShowF(index) {
      this.pictureIndex = index;
      this.pictureShow = true;
    },
    change(val) {
      this.addData.name = val[0].name;
      this.addData.game_id = val[0].game_id.toString();
    },
    dialogShow() {
      this.dialogVisible = true;
      getGame("1", {
        uid: "n",
        level: 0,
        subject: 0
      }).then(({ data }) => {
        this.options = data.gameList.map(item => {
          return {
            label: item.name,
            value: { name: item.name, game_id: item.id }
          };
        });
      });
    },
    addBanner() {
      this.$refs.ref.validate(vaild => {
        if (vaild) {
          const data = {
            ...this.addData,
            manager_id: storageSession.getItem("info").id.toString(),
            manager_name: storageSession.getItem("info").username
          };
          uploadBanner(data).then(data => {
            successMessage("上传成功！");
            this.getData();
          });
        }
      });
    }
  }
};
</script>

<template>
  <div class="bg-fff p-10">
    <el-button type="primary" @click="dialogShow" class="m-10"
      >点击上传</el-button
    >
    <el-table :data="data" border :header-cell-style="headerStyle">
      <el-table-column prop="id" label="编号" width="80" />
      <el-table-column label="比赛名称" prop="name" min-width="120" />
      <el-table-column label="海报" width="100">
        <template #default="scope">
          <el-image
            style="width: 50px; height: 30px"
            :src="scope.row.image"
            fit="cover"
            @click="pictureShowF(scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="manager_name" label="发布管理员" width="100" />
      <el-table-column label="发布时间" min-width="160">
        <template #default="scope">
          {{ timeFormat(scope.row.created_at) }}
        </template>
      </el-table-column>
    </el-table>
    <el-image-viewer
      v-if="pictureShow"
      teleported
      :initial-index="pictureIndex"
      hide-on-click-modal
      :url-list="pictureList"
      @close="pictureShow = false"
    />
    <div class="mt-10 flex" style="justify-content: right">
      <el-pagination
        background
        layout="total,prev, pager, next"
        v-model:page-size="limit"
        v-model:current-page="page"
        @current-change="getData"
        @prev-click="getData"
        @next-click="getData"
        :total="total"
      />
    </div>
    <el-dialog
      :model-value="dialogVisible"
      title="添加banner"
      :close-on-click-modal="false"
      @close="dialogVisible = false"
    >
      <el-form ref="ref" :model="addData" label-width="auto" :rules="rules">
        <el-form-item label="海报" required prop="image">
          <el-upload
            class="upload-demo flex"
            :limit="1"
            action=""
            :http-request="httpRequest"
            :file-list="fileList"
            list-type="picture"
          >
            <div class="upload-icon mr-10">
              <iconifyIconOnline icon="plus" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="name" label="赛事名称" required>
          <el-cascader
            @change="change"
            :options="options"
            placeholder="请选择比赛"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addBanner">提交</el-button>
          <el-button type="danger" @click="dialogVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.upload-icon {
  width: 60px;
  border-radius: 5px;
  height: 60px;
  font-size: 22px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  justify-content: center;
}
:deep(.el-upload-list--picture .el-upload-list__item-thumbnail) {
  width: auto;
  z-index: -1;
}
</style>
