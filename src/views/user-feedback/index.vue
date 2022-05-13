<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-13 22:44:14
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 19:48:24
-->

<template>
  <div class="height-100 bg-fff p-10">
    <div>
      <el-table :data="data" :header-cell-style="headerStyle" border>
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="user_name" label="用户" />
        <el-table-column prop="content" label="反馈内容" />
        <el-table-column prop="created_at" label="反馈时间" />
        <el-table-column label="处理反馈">
          <template #default="scope">
            <el-button
              size="small"
              :disabled="scope.row.status == '1'"
              :type="scope.row.status == '1' ? 'success' : 'primary'"
              @click="handle(scope.row)"
            >
              {{ scope.row.status == "1" ? "已处理" : "待处理" }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt-10 mb-10 flex" style="justify-content: right">
        <el-pagination
          background
          layout="total,prev, pager, next"
          v-model:page-size="limit"
          v-model:current-page="page"
          :total="total"
          @current-change="getData"
          @prev-click="getData"
          @next-click="getData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getTipList, handle } from "/@/api/tip.ts";
import { successMessage } from "/@/utils/message";
export default {
  data() {
    return {
      headerStyle: { "background-color": "rgba(0,0,0,0.05)" },
      data: [],
      total: 0,
      limit: 10,
      page: 1
    };
  },
  mounted() {
    this.page = 1;
    this.getData(true);
  },
  methods: {
    handle(item) {
      handle(item.id, { ...item, status: "1" }).then(({ data }) => {
        console.log(data);
        successMessage("处理成功");
        this.getData();
      });
    },
    timeFormat(time) {
      return time.replace(/T/g, " ").replace(/\.[\d]{6}Z/g, "");
    },
    getData() {
      getTipList(this.page).then(({ data }) => {
        this.data = data.tipList.map(item => {
          return { ...item, created_at: this.timeFormat(item.created_at) };
        });
        this.total = data.total;
        this.limit = data.limit;
      });
    }
  }
};
</script>
