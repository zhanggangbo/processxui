<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="md-pricetag"></Icon>流程节点实例
      </p>
      <Table border :columns="columns" :data="processNodeInstanceData" />
    </Card>
  </div>
</template>
<script>
import { getProcessNodeInstanceData } from "@/api/data";
import { StatusEnum } from "./constants";
import { toTimestr } from "@/libs/tools";

export default {
  props: {
    bizNo: String
  },
  data() {
    return {
      searchParam: {
        bizNo: ""
      },

      columns: [
        {
          title: "节点ID",
          key: "nodeId",
          minWidth: 100,
          align: "center"
        },
        {
          title: "失败执行次数",
          key: "failedCount",
          width: 110,
          align: "center"
        },
        {
          title: "已执行次数",
          key: "execCount",
          minWidth: 100,
          align: "center"
        },
        {
          title: "执行状态",
          key: "status",
          minWidth: 130,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const status = StatusEnum[row.status];
            return h(
              "Tag",
              {
                props: {
                  color: status.color,
                  type: "dot"
                }
              },
              status.desc
            );
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", toTimestr(params.row.createTime));
          }
        },
        {
          title: "修改时间",
          key: "modifiedTime",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", toTimestr(params.row.modifiedTime));
          }
        }
      ],

      processNodeInstanceData: []
    };
  },

  methods: {
    searchProcessNodeInstanceData(data) {
      this.searchParam.bizNo = data;
      const param = this.searchParam;
      getProcessNodeInstanceData(param).then(res => {
        if (res.success) {
          const data = res.data || [];
          this.processNodeInstanceData = data;
        } else {
          this.$Notice.error({
            desc: res.resultMsg
          });
        }
      });
    }
  },

  mounted() {
    const bizNo = this.bizNo;
    this.searchProcessNodeInstanceData(bizNo);
  }
};
</script>

