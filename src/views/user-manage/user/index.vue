<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-05-11 18:46:26
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-13 21:03:03
-->
<template>
  <div class="bg-fff p-10">
    <el-table
      :data="data"
      class="mt-10"
      border
      :header-cell-style="headerStyle"
    >
      <el-table-column prop="openid" label="用户ID" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column label="头像">
        <template #default="scope">
          <div class="flex">
            <el-avatar :size="26" :src="scope.row.avatar" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="school" label="学校" />
      <el-table-column prop="specialty" label="专业" />
      <el-table-column prop="college" label="年级" />
      <el-table-column prop="phone" label="联系方式" width="120" />
      <el-table-column prop="well" label="爱好" min-width="120" />
      <el-table-column prop="introduction" label="自我简介" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <div class="flex">
            <el-popconfirm
              :title="scope.row.status == 2 ? '确认禁言' : '确认取消禁言'"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="disabledPerson(scope.row)"
            >
              <template #reference
                ><el-button
                  :type="scope.row.status == 2 ? 'danger' : 'primary'"
                  size="small"
                  >{{ scope.row.status == 2 ? "禁言" : "取消禁言" }}</el-button
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
        @current-change="getData"
        @prev-click="getData"
        @next-click="getData"
        :total="total"
      />
    </div>
  </div>
</template>
<script>
import { getUserList, disableUser } from "/@/api/user.ts";
import { successMessage } from "/@/utils/message";
export default {
  data() {
    return {
      data: [],
      page: 1,
      limit: 10,
      total: 0,
      headerStyle: { "background-color": "rgba(0,0,0,0.05)" }
    };
  },
  mounted() {
    this.getData(true);
  },
  methods: {
    disabledPerson(item) {
      let text, status;
      if (item.status == 2) {
        text = "禁言成功！";
        status = "1";
      } else {
        text = "取消禁言成功！";
        status = "2";
      }
      disableUser(item.openid, { ...item, status: status }).then(() => {
        successMessage(text);
        this.getData();
      });
    },
    getData() {
      getUserList(this.page).then(({ data }) => {
        this.data = data.list.map(item => {
          let data = {};
          if (item.sex == "请选择") {
            data["sex"] = "用户未修改";
          }
          if (item.well == "") {
            data["well"] = "用户未填写";
          }
          return { ...item, ...data };
        });
        this.total = data.total;
        this.limit - data.limit;
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
