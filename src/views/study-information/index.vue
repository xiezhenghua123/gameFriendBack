<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-13 22:44:07
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-15 16:20:01
-->
<script>
import { imageUpload } from "/@/api/gameManage";
import { uploadStudy, getStudyList, deleteStudy } from "/@/api/study";
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
      addData: {
        url: "",
        name: "",
        manager_name: "",
        subject: "",
        manager_id: ""
      },
      subjectOptions: [
        {
          label: "数学建模竞赛",
          value: "数学建模竞赛"
        },
        {
          label: "物理竞赛",
          value: "物理竞赛"
        },
        {
          label: "电子竞赛",
          value: "电子竞赛"
        },
        {
          label: "创新创业大赛",
          value: "创新创业大赛"
        },
        {
          label: "市场调研大赛",
          value: "市场调研大赛"
        },
        {
          label: "程序设计大赛",
          value: "程序设计大赛"
        },
        {
          label: "法庭模拟大赛",
          value: "法庭模拟大赛"
        }
      ],
      rules: {
        url: {
          required: true,
          message: "请上传文件"
        },
        name: {
          required: true,
          message: "请填写资源名称"
        },
        subject: {
          required: true,
          message: "请选择资源类型"
        }
      },
      dialogVisible: false
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
    downLoad(url) {
      window.open(url);
    },
    del(id) {
      deleteStudy(id).then(() => {
        successMessage("删除成功！");
        this.getData();
      });
    },
    getData() {
      getStudyList(this.page).then(({ data }) => {
        this.data = data.bannerList;
        this.total = data.total;
        this.limit = data.limit;
      });
    },
    httpRequest(options) {
      imageUpload(options.file).then(({ data }) => {
        this.addData.url = data;
      });
    },
    timeFormat(time) {
      return time.replace(/T/g, " ").replace(/\.[\d]{6}Z/g, "");
    },
    change(val) {
      this.addData.subject = val[0];
    },
    dialogShow() {
      this.dialogVisible = true;
    },
    addBanner() {
      this.$refs.ref.validate(vaild => {
        if (vaild) {
          const data = {
            ...this.addData,
            manager_id: storageSession.getItem("info").id.toString(),
            manager_name: storageSession.getItem("info").username
          };
          uploadStudy(data).then(() => {
            successMessage("上传成功！");
            this.getData();
            this.dialogVisible = false;
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
      <el-table-column label="资源名称" prop="name" min-width="120" />
      <el-table-column label="资源类型" prop="subject" />
      <el-table-column label="文件" width="120">
        <template #default="scope">
          <el-button @click="downLoad(scope.row.url)" type="primary" size="mini"
            >下载</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="manager_name" label="发布管理员" />
      <el-table-column label="发布时间" min-width="160">
        <template #default="scope">
          {{ timeFormat(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-popconfirm
            title="确认删除?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="del(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" size="mini"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
        <el-form-item label="文件" required prop="url">
          <el-upload
            class="upload-demo flex"
            :limit="1"
            action=""
            :http-request="httpRequest"
            :file-list="fileList"
          >
            <div class="upload-icon mr-10">
              <iconifyIconOnline icon="plus" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item prop="name" label="资源名称" required>
          <el-input v-model="addData.name" />
        </el-form-item>
        <el-form-item prop="subject" label="资源类型" required>
          <el-cascader
            @change="change"
            :options="subjectOptions"
            placeholder="请选择资源类型"
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
