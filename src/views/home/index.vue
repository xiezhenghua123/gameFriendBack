<!--
 * @Descripttion:
 * @version:
 * @Author: ZhenghuaXie
 * @Date: 2022-04-16 23:04:25
 * @LastEditors: ZhenghuaXie
 * @LastEditTime: 2022-05-12 15:48:23
-->

<template>
  <div class="content flex m-10">
    <div class="box">
      <div class="title">用户数量</div>
      <div ref="userCount" class="register number">
        {{ user.userCount }}
      </div>
    </div>
    <div class="box">
      <div class="flex flex-column mb-20">
        <div class="">比赛数量</div>
        <div ref="orderCount" class="orderSuccess number mt-10">
          {{ game.gameCount }}
        </div>
      </div>
      <div class="flex flex-column mb-20">
        <div class="">比赛关注数量</div>
        <div ref="orderCount" class="orderSuccess number mt-10">
          {{ game.gameCollectionCounts }}
        </div>
      </div>
    </div>
    <div class="box">
      <div class="flex flex-column mb-20">
        <div>征友贴数量</div>
        <div ref="incomeCount" class="revenue number">
          {{ post.postCount }}
        </div>
      </div>
      <div class="flex flex-column mb-20">
        <div>征友贴点击量</div>
        <div ref="incomeCount" class="revenue number">
          {{ post.postCollectionCount }}
        </div>
      </div>
      <div class="flex flex-column mb-20">
        <div>征友贴收藏数量</div>
        <div ref="incomeCount" class="revenue number">
          {{ post.postViewCounts }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDataStatic } from "/@/api/data.ts";
export default {
  data() {
    return {
      user: {},
      game: {},
      post: {}
    };
  },
  created() {
    getDataStatic().then(({ data }) => {
      this.game = data.game;
      this.post = data.post;
      this.user = data.user;
    });
  }
};
</script>
<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 50px;
}
.content {
  height: 90%;
  .box {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 400;
    flex-direction: column;
    flex: 1;
    margin: 15px;
    background-color: #fff;
    height: 100%;
    justify-content: center;
    border-radius: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    .collect {
      font-size: 16px;
      font-weight: 400;
      color: #9a9a9a;
      &-number {
        color: #333;
        font-weight: 300;
      }
    }
    .title {
      margin-bottom: 40px;
    }
    .number {
      font-size: 32px;
    }
    .register {
      color: rgb(21, 202, 247);
    }
    .orderSuccess {
      color: rgb(26, 236, 156);
    }
    .depositRefund {
      color: rgb(196, 216, 13);
    }
    .revenue {
      color: rgb(122, 3, 3);
    }
  }
}
</style>
