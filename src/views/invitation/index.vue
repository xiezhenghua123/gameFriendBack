<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-09 14:35:31
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 19:48:31
-->
<template>
  <div class="bg-fff p-10">
    <el-table
      :data="initData"
      class="mt-10"
      border
      :header-cell-style="headerStyle"
    >
      <el-table-column prop="id" label="帖子ID" width="80" />
      <el-table-column label="发布者" width="120">
        <template #default="scope">
          <div class="flex">
            <el-avatar :size="26" :src="scope.row.avatar" />
            <div>{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="100">
        <template #default="scope">
          <el-image
            style="width: 50px; height: 30px"
            :src="scope.row.img"
            fit="cover"
            @click="pictureShowF(scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="帖子名称" min-width="160" />
      <el-table-column prop="theme" label="帖子主题" min-width="160" />
      <el-table-column label="发布时间" min-width="160">
        <template #default="scope">
          {{ timeFormat(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="views" label="浏览次数" width="100" />
      <el-table-column label="详情" width="90">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="showContentDialog(scope.row.content)"
            >查看</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div class="flex">
            <el-popconfirm
              title="确认下架该帖子?"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="clickRemoveGame(scope.row.id)"
            >
              <template #reference
                ><el-button
                  type="danger"
                  size="small"
                  :disabled="scope.row.status == 0"
                  >{{ scope.row.status == 1 ? "下架" : "已下架" }}</el-button
                ></template
              >
            </el-popconfirm>
          </div>
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
    <el-dialog title="帖子详情" append-to-body v-model="contentDialog">
      {{ content }}
    </el-dialog>
    <div class="mt-10 flex" style="justify-content: right">
      <el-pagination
        background
        layout="total,prev, pager, next"
        v-model:page-size="limit"
        v-model:current-page="page"
        @current-change="getList"
        @prev-click="getList"
        @next-click="getList"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { getInvitationList, deleteInvitation } from "/@/api/invitation.ts";
import { successMessage } from "/@/utils/message";
export default {
  data() {
    return {
      pictureShow: false,
      initData: [],
      page: 1,
      total: 0,
      limit: 10,
      headerStyle: { "background-color": "rgba(0,0,0,0.05)" },
      pictureIndex: 0,
      contentDialog: false,
      content: ""
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    pictureList() {
      return this.initData.map(item => {
        return item.img;
      });
    }
  },
  methods: {
    clickRemoveGame(id) {
      deleteInvitation(id).then(({ code }) => {
        if (code === 0) {
          this.getList();
          successMessage("删除成功");
        }
      });
    },
    showContentDialog(content) {
      this.content = content;
      this.contentDialog = true;
    },
    timeFormat(time) {
      return time.replace(/T/g, " ").replace(/\.[\d]{6}Z/g, "");
    },
    pictureShowF(index) {
      this.pictureIndex = index;
      this.pictureShow = true;
    },
    getList() {
      getInvitationList(this.page.toString()).then(({ data }) => {
        this.initData = data.postList;
        this.limit = data.limit;
        this.total = data.total;
      });
    }
  }
};
</script>

<style></style>
