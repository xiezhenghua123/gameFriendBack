<template>
  <div class="bg-fff p-10">
    <el-button type="primary" class="mb-10" @click="dialogVisible = true"
      >添加管理员</el-button
    >
    <div>
      <el-table :data="data" :header-cell-style="headerStyle" border>
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="电话号码" min-width="120" />

        <el-table-column prop="level" label="权限">
          <template #default="scope">
            <div>
              {{ scope.row.level == 0 ? "超级管理员" : "普通管理员" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="备注" />
        <el-table-column label="操作">
          <template #default="scope">
            <div class="flex">
              <el-popconfirm
                title="确认删除该管理员?"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="removeManager(scope.row)"
              >
                <template #reference
                  ><el-button type="danger" size="small"
                    >删除</el-button
                  ></template
                >
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :model-value="dialogVisible"
      title="添加管理员"
      :close-on-click-modal="false"
      @close="dialogVisible = false"
    >
      <div>
        <el-form ref="ref" :model="addPerson" label-width="auto" :rules="rules">
          <el-form-item prop="name" label="姓名" required>
            <el-input v-model="addPerson.name" />
          </el-form-item>
          <el-form-item prop="phone" label="电话" required>
            <el-input v-model="addPerson.phone" />
          </el-form-item>
          <el-form-item prop="level" label="权限" required>
            <el-cascader
              v-model="addPerson.level"
              :options="options"
              placeholder="请选择管理员权限"
            />
          </el-form-item>
          <el-form-item prop="password" label="密码" required>
            <el-input v-model="addPerson.password" type="password" />
          </el-form-item>
          <el-form-item prop="department" label="备注" required>
            <el-input v-model="addPerson.department" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addManager">提交</el-button>
            <el-button type="danger" @click="dialogVisible = false"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getManagerList, removeManager, addManager } from "/@/api/manage-user";
import { successMessage, errorMessage } from "/@/utils/message";
import { storageSession } from "/@/utils/storage";
import { usePermissionStoreHook } from "/@/store/modules/permission";
export default {
  data() {
    return {
      headerStyle: { "background-color": "rgba(0,0,0,0.05)" },
      data: [],
      options: [
        {
          label: "超级管理员",
          value: 0
        },
        {
          label: "普通管理员",
          value: 1
        }
      ],
      dialogVisible: false,
      addPerson: {
        name: "",
        department: "",
        level: "",
        phone: "",
        password: ""
      },
      rules: {
        name: {
          required: true,
          message: "请填写姓名",
          trigger: "change"
        },
        phone: {
          required: true,
          message: "请填写电话",
          trigger: "change"
        },
        level: {
          required: true,
          message: "请选择管理员权限",
          trigger: "change"
        },
        password: {
          required: true,
          message: "请填写密码",
          trigger: "change"
        },
        department: {
          required: true,
          message: "请填写备注",
          trigger: "change"
        }
      }
    };
  },
  mounted() {
    this.getData();
  },
  beforeRouteEnter(to, from, next) {
    if (usePermissionStoreHook().buttonAuth.includes("superAdmin")) {
      next();
    } else {
      next({ path: "/inner/403" });
    }
  },
  methods: {
    addManager() {
      this.$refs.ref.validate().then(vaild => {
        if (vaild) {
          const data = {
            ...this.addPerson,
            level: this.addPerson["level"][0]
          };
          addManager(data).then(() => {
            successMessage("添加成功！");
            this.getData();
            this.dialogVisible = false;
          });
        }
      });
    },
    getData() {
      getManagerList().then(({ data }) => {
        this.data = data.list;
      });
    },
    removeManager(item) {
      console.log(
        item.id == storageSession.getItem("info").id,
        item.id,
        storageSession.getItem("info").id
      );
      if (item.id == storageSession.getItem("info").id) {
        errorMessage("不能删除本人！");
        return;
      }
      removeManager(item.id).then(() => {
        successMessage("删除成功！");
        this.getData();
      });
    }
  }
};
</script>
