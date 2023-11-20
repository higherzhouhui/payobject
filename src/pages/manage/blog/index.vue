<template>
  <div class="user_transactionInquiry_transactionDetails_contianer">
    <div class="content">
      <div class="add-new">
        <div class="normal-btn" @click="showDialog()">
          <i class="el-icon-plus"></i>
          新增
        </div>
      </div>
      <!-- <el-form ref="form2" :inline="true" class="form">
        <el-form-item>
          <el-select
            v-model="searchForm.fromCode"
            :placeholder="$t('请选择源货币种类')"
            clearable
          >
            <el-option
              style="padding: 0 20px"
              v-for="(item, index) in coinCodeList"
              :key="index"
              :label="item.coinCode"
              :value="item.coinCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.targetCode"
            :placeholder="$t('请选择兑换货币种类')"
            clearable
          >
            <el-option
              style="padding: 0 20px"
              v-for="(item, index) in coinCodeList"
              :key="index"
              :label="item.coinCode"
              :value="item.coinCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchForm.startTime"
            align="right"
            type="datetime"
            placeholder="开始时间"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="searchForm.endTime"
            align="right"
            type="datetime"
            placeholder="结束时间"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleChangeSearch"
            class="normal-btn"
          >
            <i class="el-icon-search"></i>{{ $t("search") }}
          </el-button>
        </el-form-item>
      </el-form> -->
      <el-table
        class="tables"
        size="small"
        :data="tableData"
        v-loading="loading"
      >
        <el-table-column
          prop="title"
          :label="$t('标题')"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="mainPoint"
          :label="$t('摘要')"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="content"
          :label="$t('内容')"
          min-width="250"
          show-overflow-tooltip
        />
        <el-table-column
          prop="recommend"
          :label="$t('是否推荐')"
          min-width="80"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.recommend"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="cover" :label="$t('封面')" min-width="120">
          <template slot-scope="scope">
            <el-image
              :src="`/api/file/downLoad?url=${scope.row.cover}`"
              class="cover"
              :previewSrcList="[`/api/file/downLoad?url=${scope.row.cover}`]"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          :label="$t('创建时间')"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="modifiedTime"
          :label="$t('更新时间')"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="modifiedTime"
          :label="$t('更新时间')"
          width="120"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="info"
              class="btn detail-btn"
              size="small"
              @click="showDialog(scope.row)"
            >
              {{ $t("修改") }}
            </el-button>
            <el-popconfirm title="确定删除吗？" @confirm="deleteCms(scope.row)">
              <el-button
                slot="reference"
                type="danger"
                class="btn"
                size="small"
              >
                {{ $t("删除") }}
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
        <div slot="empty">
          <el-empty
            :description="$t('nodata')"
            style="padding: 50px"
          ></el-empty>
        </div>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="current"
        :page-sizes="[10, 50, 100, 500]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="elPagination"
      >
      </el-pagination>
      <el-dialog
        :title="blogForm.id ? '修改' : '新增'"
        :visible.sync="dialogVisible"
        width="636px"
        :before-close="
          () => {
            dialogVisible = false;
          }
        "
      >
        <el-form label-width="120px" ref="formss" :model="blogForm">
          <el-form-item :label="$t('标题')" class="mb24">
            <el-input
              v-model="blogForm.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('摘要')" class="mb24">
            <el-input
              type="textarea"
              v-model="blogForm.mainPoint"
              placeholder="请输入摘要"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('内容')" class="mb24">
            <!-- <el-input
              type="textarea"
              v-model="blogForm.content"
              placeholder="请输入内容"
            ></el-input> -->
          </el-form-item>
          <el-form-item :label="$t('封面')" class="mb24">
            <el-upload
              class="upload-demo"
              action="null"
              list-type="text"
              accept="image/*"
              :before-upload="(e) => handlesuccess(e)"
              v-if="!blogForm.id"
            >
              <el-button size="small" type="primary" class="btn">{{
                blogForm.cover ? $t("ysccxsc") : $t("djsc")
              }}</el-button>
            </el-upload>
            <el-image
              v-if="blogForm.cover"
              :src="`/api/file/downLoad?url=${blogForm.cover}`"
              class="cover"
              :previewSrcList="[`/api/file/downLoad?url=${blogForm.cover}`]"
            />
          </el-form-item>
          <el-form-item :label="$t('是否推荐')" class="mb24">
            <el-switch v-model="blogForm.recommend"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{
            $t("cancel")
          }}</el-button>
          <el-button
            type="primary"
            :class="loading && 'loading'"
            @click="addBlog"
            >{{ $t("sure") }}</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  cmsPageReq,
  cmsRecommend,
  cmsSaveReq,
  cmsDeleteReq,
} from "@/api/common";
import { upload } from "@/api/file";
import { Message } from "element-ui";


export default {
  name: "transactionInquiry",
  data() {
    return {
      tableData: [],
      options: [],
      type: "1",
      dialogVisible: false,
      blogForm: {
        recommend: false,
        content: "",
      },
      linkList: ["jycx", "兑换明细"],
      form: {
        name: "",
      },
      loading: true,
      current: 1,
      size: 10,
      total: 0,
      searchForm: {},
      coinCodeList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  created() {
    this.getInitData();
  },
  methods: {
    async changeSwitch(row) {
      try {
        this.loading = true;
        await cmsRecommend({ id: row.id, act: row.recommend });
        this.loading = false;
        this.getInitData();
      } catch {
        this.loading = false;
      }
    },
    async deleteCms(row) {
      try {
        this.loading = true;
        await cmsDeleteReq({ id: row.id });
        this.loading = false;
        this.getInitData();
      } catch {
        this.loading = false;
      }
    },
    async addBlog() {
      if (this.loading) {
        return;
      }
      try {
        this.loading = true;
        await cmsSaveReq(this.blogForm);
        this.loading = false;
        this.dialogVisible = false;
        this.getInitData();
        this.$message.success("操作成功！");
      } catch (error) {
        this.loading = false;
      }
    },
    async handlesuccess(e) {
      const size = e.size;
      if (size > 20 * 1024 * 1024) {
        Message({
          type: "error",
          message: this.$t("sizeOver"),
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", e);
      try {
        const req = await upload(formData);
        if (req.code === 200) {
          this.blogForm.cover = req.data[0];
          this.$forceUpdate();
          Message({
            type: "success",
            message: this.$t("sccg"),
          });
        }
      } catch (error) {}
      return false;
    },
    showDialog(row) {
      this.blogForm = row || { recommend: false, content: "" };
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getInitData();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getInitData();
    },
    handleChangeSearch() {
      this.getInitData();
    },
    async getInitData() {
      this.loading = true;
      let res;
      const param = {
        ...this.searchForm,
        current: this.current,
        size: this.size,
      };
      res = await cmsPageReq(param);
      this.loading = false;
      if (res.code === 200) {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.user_transactionInquiry_transactionDetails_contianer {
  .content {
    padding: 1rem;
    border-radius: 4px;
    background: $contentColor;
    .add-new {
      display: flex;
      justify-content: flex-end;
      .normal-btn {
        width: fit-content;
      }
    }
    .form {
      margin-top: 20px;
    }
    .normal-btn {
      height: 40px;
    }
  }
}
.btn {
  padding: 4px 6px;
  color: #fff;
}
.detail-btn {
  margin-right: 6px;
}
.cover {
  height: 80px;
  object-fit: contain;
}
</style>
