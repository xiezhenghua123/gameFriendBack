<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-18 22:35:32
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-10 10:44:30
-->
<script>
import { addGame, imageUpload, editGame } from "/@/api/gameManage";
import { successMessage } from "/@/utils/message";
export default {
  emits: ["confirm"],
  data() {
    return {
      gameData: {
        data: {
          img: "",
          name: "",
          organizer: "",
          game_time: "",
          sign_up_time: "",
          subject: "",
          level: "",
          content: ""
        },
        fileList: []
      },
      level: [
        {
          label: "校级",
          value: "校级"
        },
        {
          label: "省级",
          value: "省级"
        },
        {
          label: "国家级",
          value: "国家级"
        }
      ],
      subject: [
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
        content: {
          required: true,
          message: "请填写赛事详情",
          trigger: "change"
        },
        img: {
          required: true,
          message: "请上传海报",
          trigger: "change"
        },
        name: {
          required: true,
          message: "请输入赛事名称",
          trigger: "change"
        },
        organizer: {
          required: true,
          message: "请输入主办方",
          trigger: "change"
        },
        sign_up_time: {
          required: true,
          message: "请选择报名时间",
          trigger: "change"
        },
        game_time: {
          required: true,
          message: "请选择比赛时间",
          trigger: "change"
        },
        subject: {
          required: true,
          message: "请选择竞赛科目",
          trigger: "change"
        },
        level: {
          required: true,
          message: "请选择竞赛级别",
          trigger: "change"
        }
      },
      //判断是添加还是编辑比赛
      operation: "add"
    };
  },
  props: {
    initData: {
      type: Object
    }
  },
  watch: {
    initData: {
      handler(val) {
        if (JSON.stringify(val) !== "{}") {
          for (let item in val) {
            if (item == "level" || item == "subject") {
              this.gameData.data[item] = [val[item]];
            } else {
              this.gameData.data = val;
            }
          }
          this.gameData.fileList = [{ url: JSON.parse(val.img)[0] }];
          this.operation = "edit";
        } else {
          this.operation = "add";
          this.gameData.data = {};
          this.gameData.fileList = [];
        }
      },
      immediate: true
    }
  },
  methods: {
    httpRequest(options) {
      imageUpload(options.file).then(({ data }) => {
        this.gameData.data["img"] = data;
      });
    },
    cancel() {
      this.$emit("cancel", false);
    },
    clickAddGame() {
      this.$refs.gameRef.validate(vaild => {
        if (vaild) {
          const data = {};
          for (let item in this.gameData.data) {
            if (item == "img") {
              data[item] = JSON.stringify([this.gameData.data[item]]);
            } else {
              data[item] = this.gameData.data[item].toString();
            }
          }
          data["publisher"] = "1";
          if (this.operation === "add") {
            addGame(data).then(data => {
              if (data["code"] === 0) {
                // this.$emit("update:dialogVisible", false);
                this.$emit("confirm", true);
                successMessage("发布成功");
              }
            });
          } else {
            editGame(data, data["id"]).then(data => {
              if (data["code"] === 0) {
                // this.$emit("update:dialogVisible", false);
                this.$emit("confirm", true);
                successMessage("修改成功");
              }
            });
          }
        }
      });
    }
  }
};
</script>
<template>
  <div>
    <el-form
      ref="gameRef"
      :model="gameData.data"
      label-width="auto"
      :rules="rules"
    >
      <el-form-item label="图片上传" prop="img" required>
        <el-upload
          class="upload-demo flex"
          :limit="1"
          name="image"
          action=""
          :http-request="httpRequest"
          :file-list="gameData.fileList"
          list-type="picture"
        >
          <div class="upload-icon mr-10">
            <iconifyIconOnline icon="plus" />
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item prop="name" label="赛事名称" required>
        <el-input v-model="gameData.data.name" />
      </el-form-item>
      <el-form-item prop="name" label="主办方" required>
        <el-input v-model="gameData.data.organizer" />
      </el-form-item>
      <el-form-item prop="game_time" label="比赛时间" required>
        <el-date-picker
          v-model="gameData.data.game_time"
          type="datetime"
          placeholder="选择比赛时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item prop="sign_up_time" label="报名截止时间" required>
        <el-date-picker
          v-model="gameData.data.sign_up_time"
          placeholder="选择报名截止时间"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item prop="subject" label="竞赛科目" required>
        <el-cascader
          v-model="gameData.data.subject"
          :options="subject"
          placeholder="请选择竞赛科目"
        />
      </el-form-item>
      <el-form-item prop="level" label="竞赛级别" required>
        <el-cascader
          v-model="gameData.data.level"
          :options="level"
          placeholder="请选择竞赛级别"
        />
      </el-form-item>
      <el-form-item prop="content" label="赛事详情" required>
        <el-input v-model="gameData.data.content" type="textarea" />
        <div style="color: #bbb">备注:在赛事详情里面写上联系方式会更好哦！</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickAddGame">提交</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
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

:deep(.el-upload-list__item .el-upload-list__item-thumbnail) {
  z-index: -1;
}

:deep(.el-date-editor .el-input__inner) {
  padding-left: 30px !important;
}
</style>
