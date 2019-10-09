<template>
  <div>
    <Card>
      <div class="search-con">
        <Input
          clearable
          placeholder="请输入业务流水号搜索"
          class="search-input"
          v-model="searchParam.queryData"
        />
        <Button
          class="search-btn"
          type="primary"
          icon="ios-search"
          :disabled="!searchParam.queryData"
          @click="searchProcessInstancePageData"
        >搜索</Button>
      </div>

      <Table border :columns="columns" :data="processInstancePageData" />

      <div style="marginTop: 15px; overflow: hidden">
        <div style="float: right;">
          <Page
            :total="pageData.total"
            :current="pageData.pageCurrent"
            :page-size="pageData.pageSize"
            show-total
            show-sizer
            @on-change="searchProcessInstancePageData"
            @on-page-size-change="onPageSizeChange"
          />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { getProcessInstancePageData } from "@/api/data";
import { toTimestr } from "@/libs/tools";
import node from "./node/node.vue";

export default {
  data() {
    return {
      searchParam: {
        queryData: "",
        pageNum: 1,
        pageSize: 10
      },

      pageData: {
        pageCurrent: 1,
        total: 0,
        pageSize: 10
      },

      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(node, {
              props: {
                bizNo: params.row.bizNo
              }
            });
          }
        },
        {
          title: "流程ID",
          key: "processId",
          width: 100,
          align: "center"
        },
        {
          title: "流程实例ID",
          key: "id",
          align: "center"
        },

        {
          title: "业务流水号",
          key: "bizNo",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return h("div", toTimestr(params.row.createTime));
          }
        },
        {
          title: "修改时间",
          key: "modifiedTime",
          align: "center",
          render: (h, params) => {
            return h("div", toTimestr(params.row.modifiedTime));
          }
        }
      ],

      processInstancePageData: []
    };
  },

  methods: {
    searchProcessInstancePageData(pageCurrent) {
      this.searchParam.pageNum = pageCurrent;
      const param = this.searchParam;
      getProcessInstancePageData(param).then(res => {
        if (res.success) {
          const data = res.data || {};
          const pageData = data.pageData || [];
          this.processInstancePageData = pageData;
          this.pageData.total = data.total;
        } else {
          this.$Notice.error({
            desc: res.resultMsg
          });
        }
      });
    },

    onPageSizeChange(pageSize) {
      this.pageData.pageSize = pageSize;
      this.searchProcessInstancePageData(1);
    },

    gotoNode(data) {
      this.$router.push({ name: "instance_node", params: { bizNo: data } });
    }
  },

  mounted() {
    this.searchProcessInstancePageData(1);
  }
};
</script>

<style lang="less">
.search-con {
  padding-bottom: 10px;
  .search {
    &-input {
      display: inline-block;
      width: 400px;
      margin-left: 2px;
    }
    &-btn {
      margin-left: 2px;
    }
  }
}
</style>
