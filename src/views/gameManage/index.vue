<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 22:35:49
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-04-20 17:15:07
-->
<script setup>
import { reactive, ref } from "vue";
import { getGame, removeGame } from "/@/api/gameManage";
import { successMessage } from "/@/utils/message";

const initData = reactive({ dataList: [] });
const page = ref(1);
const limit = ref(10);
const total = ref(0);

//初始化数据函数
const getGameinit = () => {
  getGame(page.value).then(({ data }) => {
    initData.dataList = data.gameList;
    limit.value = data.limit;
    total.value = data.total;
  });
};
// 初始化数据;
getGameinit();

// 删除比赛
const clickRemoveGame = id => {
  removeGame(id).then(({ code }) => {
    if (code === 0) {
      getGameinit();
      successMessage("删除成功");
    }
  });
};
</script>

<script>
import addGameComponent from "./addGame/index.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      headerStyle: { "background-color": "rgba(0,0,0,0.05)" },
      editGameData: {}
    };
  },

  methods: {
    editGame(data) {
      this.editGameData = data;
      this.dialogVisible = true;
    },
    addGame() {
      this.dialogVisible = true;
      this.editGameData = {};
    },
    confirm(data) {
      if (data) {
        this.getGameinit();
      }
    }
    // timeFormat(time) {
    //   return time.replace(/T/g, " ").replace(/\.[\d]{6}Z/g, "");
    // }
  }
};
</script>

<template>
  <div class="height-100 bg-fff p-10">
    <el-button type="primary" @click="addGame" size="large">发布比赛</el-button>
    <el-table
      :data="initData.dataList"
      class="mt-10"
      border
      :header-cell-style="headerStyle"
    >
      <el-table-column prop="name" label="比赛名称" />
      <el-table-column prop="organizer" label="主办方" />
      <el-table-column prop="level" label="赛事级别" width="90" />
      <el-table-column prop="subject" label="赛事科目" width="90" />
      <el-table-column prop="game_time" label="比赛时间" width="160" />
      <el-table-column prop="sign_up_time" label="报名截止时间" width="120" />
      <el-table-column prop="collections" label="收藏人数" width="90" />
      <!-- <el-table-column label="创建时间" width="180">
        <template #default="scope">
          {{ timeFormat(scope.row.created_at) }}
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div class="flex">
            <el-button type="primary" size="small" @click="editGame(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="clickRemoveGame(scope.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-10 flex" style="justify-content: right">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:page-size="limit"
        v-model:current-page="page"
        @current-change="getGameinit"
        @prev-click="getGameinit"
        @next-click="getGameinit"
        :total="total"
      />
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="发布比赛"
      :close-on-click-modal="false"
    >
      <addGameComponent
        v-model:dialogVisible="dialogVisible"
        :initData="editGameData"
        @confirm="confirm"
      />
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-overlay) {
  z-index: 2000 !important;
}
</style>
