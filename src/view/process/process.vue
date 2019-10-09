<template>
  <div>
    <Card>
      <div class="search-con">
        <Input
          clearable
          placeholder="请输入流程名称搜索"
          class="search-input"
          v-model="searchParam.queryData"
        />
        <Button
          class="search-btn"
          type="primary"
          icon="ios-search"
          :disabled="!searchParam.queryData"
          @click="searchProcessPageData"
        >搜索</Button>
      </div>

      <Table border :columns="columns" :data="processPageData"></Table>

      <div style="marginTop: 15px; overflow: hidden">
        <div style="float: right;">
          <Page
            :total="pageData.total"
            :current="pageData.pageCurrent"
            :page-size="pageData.pageSize"
            show-total
            show-sizer
            @on-change="searchProcessPageData"
            @on-page-size-change="onPageSizeChange"
          />
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { getProcessPageData } from "@/api/data";
import { RecordEnum } from "./constants";

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
          title: "流程ID",
          key: "id",
          width: 100,
          fixed: "left",
          align: "center"
        },
        {
          title: "流程名称",
          key: "name",
          minWidth: 100,
          align: "center"
        },
        {
          title: "版本号",
          key: "version",
          minWidth: 100,
          align: "center"
        },
        {
          title: "是否记录流程实例",
          key: "recordProcessInstance",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const record = RecordEnum[row.recordProcessInstance];

            return h(
              "Tag",
              {
                props: {
                  color: record.color
                }
              },
              record.desc
            );
          }
        },
        {
          title: "是否记录节点实例",
          key: "recordNodeInstance",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const record = RecordEnum[row.recordNodeInstance];

            return h(
              "Tag",
              {
                props: {
                  color: record.color
                }
              },
              record.desc
            );
          }
        },
        {
          title: "是否记录全局变量",
          key: "recordGlobalParam",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const record = RecordEnum[row.recordGlobalParam];

            return h(
              "Tag",
              {
                props: {
                  color: record.color
                }
              },
              record.desc
            );
          }
        },
        {
          title: "是否记录流程输入",
          key: "recordProcessInput",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const record = RecordEnum[row.recordProcessInput];

            return h(
              "Tag",
              {
                props: {
                  color: record.color
                }
              },
              record.desc
            );
          }
        },
        {
          title: "是否记录触发节点输入",
          key: "recordTriggerInput",
          minWidth: 180,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const record = RecordEnum[row.recordTriggerInput];

            return h(
              "Tag",
              {
                props: {
                  color: record.color
                }
              },
              record.desc
            );
          }
        },
        {
          title: "是否记录触发节点执行节点",
          key: "recordTriggerResult",
          minWidth: 190,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const record = RecordEnum[row.recordTriggerResult];

            return h(
              "Tag",
              {
                props: {
                  color: record.color
                }
              },
              record.desc
            );
          }
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          fixed: "right",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.gotoNode(params.row.id);
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],

      processPageData: []
    };
  },

  methods: {
    searchProcessPageData(pageCurrent) {
      this.searchParam.pageNum = pageCurrent;
      const param = this.searchParam;
      getProcessPageData(param).then(res => {
        if (res.success) {
          const data = res.data || {};
          const pageData = data.pageData || [];
          this.processPageData = pageData;
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
      this.$router.push({ name: "node", params: { processId: data } });
    }
  },

  mounted() {
    this.searchProcessPageData();
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
