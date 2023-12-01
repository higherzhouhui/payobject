<template>
  <div class="user_transactionInquiry_transactionDetails_contianer">
    <div class="search-container">
      <div class="admin-title">
        {{ $store.state.title }}
        <el-button type="primary normal-btn" @click="showDialog" class="primary"
          ><i class="el-icon-plus"></i>{{ $t("add") }}</el-button
        >
      </div>
    </div>
    <div class="content">
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
        prop="yuyan"
        :label="$t('yuyan')"
        min-width="80"
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
        <el-table-column :label="$t('cz')" width="105" fixed="right">
          <template slot-scope="scope">
            <div
              class="operation-btn"
              @click="handleShowDetail(scope.row, 'detail')"
            >
              {{ $t("xq") }}
            </div>
            <div class="operation-btn" @click="showDialog(scope.row)">
              {{ $t("xg") }}
            </div>
            <div
              class="operation-btn"
              @click="handleShowDetail(scope.row, 'del')"
            >
              {{ $t("del") }}
            </div>
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
        layout="prev, pager, next"
        small
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
        <el-form
          ref="formss"
          :model="blogForm"
          label-position="top"
          class="formStyle"
        >
          <el-form-item :label="$t('yuyan')">
            <el-select style="width: 100%" v-model="blogForm.lang">
              <el-option :label="item.label" :value="item.value" v-for="item in langList" :key="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('title')">
            <el-input v-model="blogForm.title" :placeholder="$t('qsr')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('zhaiyao')">
            <el-input
              type="textarea"
              v-model="blogForm.mainPoint"
              :placeholder="$t('qsr')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('content')">
            <Editor
              :passSon="blogForm.content"
              @update:content="updateContent"
            />
          </el-form-item>
          <el-form-item :label="$t('cover')">
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
          <el-form-item :label="$t('sftj')">
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
      <el-dialog
      :title="$t('xq')"
      :visible.sync="detailVisible"
      width="600px"
      :before-close="
        () => {
          detailVisible = false;
        }
      "
    >
      <div class="formStyle">
        <div
          class="list"
          v-for="(item, index) in detailList.filter((item) => {
            return item.value;
          })"
          :key="index"
        >
        
          <div class="list-left">{{ item.label }}</div>
          <div class="list-right">
            <template v-if="item.type == 'link'">
              <a :href="item.value" target="_blank">
                <span><i class="el-icon-folder-checked"></i>
                  {{ $t("download") }}</span>
              </a>
            </template>
            <template v-if="!item.type">
              {{ item.value }}
            </template>
            <template v-if="item.type == 'html'">
              <span v-html="item.value" />
            </template>
            <template v-if="item.type == 'bol'">
              {{ item.value ? $t('yes') : $t('no') }}
            </template>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button class="qx" @click="detailVisible = false">{{
          $t("cancel")
        }}</el-button>
        <el-button
          v-if="operationType == 'del'"
          class="qd"
          @click="deleteRow"
          >{{ $t("del") }}</el-button
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
import Editor from "@/components/Editor";
import { pjDownUrl } from '@/utils/common';

export default {
  name: "transactionInquiry",
  components: {
    Editor,
  },
  data() {
    return {
      langList: [
        {label: '中文', value: 'zh'},
        {label: 'Englist', value: 'en'},
      ],
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
      detailVisible: false,
      detailList: [],
      operationType: "",
      currentSelectRow: {},
    };
  },
  created() {
    this.getInitData();
  },
  methods: {
    handleShowDetail(row, type) {
      this.currentSelectRow = row;
      this.detailVisible = true;
      this.operationType = type
      this.detailList = [
          { label: this.$t("title"), value: row.title },
          { label: this.$t("zhaiyao"), value: row.mainPoint },
          { label: this.$t("content"), value: row.content, type: 'html' },
          { label: this.$t("sftj"), value: row.recommend, type: 'bol' },
          { label: this.$t("yuyan"), value: row.yuyan },
          { label: this.$t("cjsj"), value: row.createTime },
          { label: this.$t("xgsj"), value: row.modifiedTime },
          { label: this.$t("cover"), value: pjDownUrl(row.cover), type: "link" },
        ];
 
    },
    deleteRow() {
      this.deleteCms(this.currentSelectRow.id)
    },
    updateContent(e) {
      this.blogForm.content = e;
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
        this.$message.success(this.$t("czcg"));
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
            cover: req.data[0],
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
      this.current = 1;
      this.getInitData();
    },
    async getInitData() {
      this.loading = true;
      let res;
      const param = {
        ...this.searchForm,
        current: this.current,
        size: this.size,
        lang: this.$i18n.locale,
      };
      res = await cmsPageReq(param);
      this.loading = false;
      if (res.code === 200) {
        this.tableData = res.data.records;
        this.tableData.forEach(item => {
          item.yuyan = item.lang == 'zh' ? '中文' : 'EngLish'
        })
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
