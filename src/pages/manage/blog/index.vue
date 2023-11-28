<template>
  <div class="user_transactionInquiry_transactionDetails_contianer">
    <div class="content">
      <div class="add-new">
        <div class="normal-btn" @click="showDialog()">
          <i class="el-icon-plus"></i>
          新增
        </div>
      </div>
      <el-table
        class="tables"
        size="small"
        :data="tableData"
        v-loading="loading"
      >
        <el-table-column
          prop="title"
          :label="$t('title')"
          min-width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="mainPoint"
          :label="$t('zhaiyao')"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="content"
          :label="$t('content')"
          min-width="250"
          show-overflow-tooltip
        />
        <el-table-column
          prop="recommend"
          :label="$t('sftj')"
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
        <el-table-column prop="cover" :label="$t('cover')" min-width="120">
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
          :label="$t('cjsj')"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          prop="modifiedTime"
          :label="$t('xgsj')"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          :label="$t('cz')"
          width="120"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              class="btn detail-btn"
              size="small"
              @click="showDialog(scope.row)"
            >
              {{ $t("xg") }}
            </el-button>
            <el-popconfirm :title="$t('qrsc')" @confirm="deleteCms(scope.row)">
              <el-button
                slot="reference"
                type="danger"
                class="btn"
                size="small"
              >
                {{ $t("del") }}
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
        :title="blogForm.id ? $t('xg') : $t('add')"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="
          () => {
            dialogVisible = false;
          }
        "
      >
        <el-form label-width="120px" ref="formss" :model="blogForm" label-position="top" class="formStyle">
          <el-form-item :label="$t('title')" class="mb24">
            <el-input
              v-model="blogForm.title"
              placeholder="qsrbt"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('zhaiyao')" class="mb24">
            <el-input
              type="textarea"
              v-model="blogForm.mainPoint"
              placeholder="qsrzy"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('content')" class="mb24">
            <Editor :passSon="blogForm.content" @update:content="updateContent"/>
          </el-form-item>
          <el-form-item :label="$t('cover')" class="mb24">
            <el-upload
              class="upload-demo"
              action="null"
              list-type="text"
              accept="image/*"
              :before-upload="(e) => handlesuccess(e)"
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
          <el-form-item :label="$t('sftj')" class="mb24">
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
import Editor from "@/components/Editor"

export default {
  name: "transactionInquiry",
  components: {
    Editor
  },
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
      form: {
        name: "",
      },
      loading: true,
      current: 1,
      size: 10,
      total: 0,
      searchForm: {},
    };
  },
  created() {
    this.getInitData();
  },
  methods: {
    updateContent(e) {
      this.blogForm.content = e
    },
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
        this.$message.success("czcg");
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
          this.blogForm = {
            ...this.blogForm,
            cover: req.data[0]
          };
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
      this.current = 1
      this.getInitData();
    },
    async getInitData() {
      this.loading = true;
      let res;
      const param = {
        ...this.searchForm,
        current: this.current,
        size: this.size,
        lang: this.$i18n.locale
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
