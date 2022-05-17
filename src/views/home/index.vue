<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 22:35:49
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 21:04:22
-->

<script>
import { getGame, removeGame } from "/@/api/gameManage";
import { successMessage } from "/@/utils/message";
import addGameComponent from "./addGame/index.vue";
export default {
  data() {
    return {
      level: 0,
      subject: 0,
      initData: {
        dataList: []
      },
      page: 1,
      limit: 10,
      total: 0,
      dialogVisible: false,
      headerStyle: { "background-color": "rgba(0,0,0,0.05)" },
      editGameData: {},
      contentDialog: false,
      content: ""
    };
  },
  components: {
    addGameComponent
  },
  mounted() {
    this.getGameinit();
  },
  methods: {
    levelFilterHandler(val, row) {
      return val == row.level;
    },
    subjectFilterHandler(val, row) {
      return val == row.subject;
    },
    clickRemoveGame(id) {
      removeGame(id).then(({ code }) => {
        if (code === 0) {
          successMessage("下架成功");
          this.getGameinit();
        }
      });
    },
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
        this.dialogVisible = false;
      }
    },
    showContentDialog(content) {
      this.content = content;
      this.contentDialog = true;
    },
    getGameinit() {
      getGame(this.page.toString(), {
        uid: "n",
        level: this.level,
        subject: this.subject
      }).then(({ data }) => {
        this.initData.dataList = data.gameList;
        this.limit = data.limit;
        this.total = data.total;
      });
    }
    // timeFormat(time) {
    //   return time.replace(/T/g, " ").replace(/\.[\d]{6}Z/g, "");
    // }
  }
};
</script>

<template>
  <div class="bg-fff p-10">
    <el-button type="primary" @click="addGame" size="large">发布比赛</el-button>
    <el-table
      :data="initData.dataList"
      class="mt-10"
      border
      :header-cell-style="headerStyle"
    >
      <el-table-column prop="name" label="比赛名称" />
      <el-table-column prop="organizer" label="主办方" />
      <el-table-column
        prop="level"
        label="赛事级别"
        width="110"
        :filters="[
          { text: '校级', value: '校级' },
          { text: '省级', value: '省级' },
          { text: '国家级', value: '国家级' }
        ]"
        :filter-method="levelFilterHandler"
      />
      <el-table-column
        prop="subject"
        label="赛事科目"
        width="110"
        :filters="[
          { text: '数学建模竞赛', value: '数学建模竞赛' },
          { text: '物理竞赛', value: '物理竞赛' },
          { text: '电子竞赛', value: '电子竞赛' },
          { text: '创新创业大赛', value: '创新创业大赛' },
          { text: '市场调研大赛', value: '市场调研大赛' },
          { text: '程序设计大赛', value: '程序设计大赛' },
          { text: '法庭模拟大赛', value: '法庭模拟大赛' }
        ]"
        :filter-method="subjectFilterHandler"
      />
      <el-table-column prop="game_time" label="比赛时间" width="160" />
      <el-table-column prop="sign_up_time" label="报名截止时间" width="120" />
      <el-table-column prop="collections" label="收藏人数" width="90" />
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
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div class="flex">
            <el-button type="primary" size="small" @click="editGame(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确认下架该比赛?"
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
    <div class="mt-10 flex" style="justify-content: right">
      <el-pagination
        background
        layout="total,prev, pager, next"
        v-model:page-size="limit"
        v-model:current-page="page"
        @current-change="getGameinit"
        @prev-click="getGameinit"
        @next-click="getGameinit"
        :total="total"
      />
    </div>
    <el-dialog
      :model-value="dialogVisible"
      title="发布比赛"
      :close-on-click-modal="false"
      @close="dialogVisible = false"
    >
      <addGameComponent
        :initData="editGameData"
        @confirm="confirm"
        @cancel="dialogVisible = false"
      />
    </el-dialog>
    <el-dialog title="赛事详情" append-to-body v-model="contentDialog">
      {{ content }}
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-overlay) {
  z-index: 2000 !important;
}
</style>
