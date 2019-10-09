
Nameless 2019/10/8 23:26:26
<template>
  <Card>
    <div :id="id"></div>

    <div class="pe-detail">
      <Card>
        <Form ref="peDetail" :model="peDetail" label-position="right">
          <FormItem label="节点" prop="name">
            <Input type="text" v-model="peDetail.name" />
          </FormItem>
          <FormItem label="类型" prop="type">
            <RadioGroup v-model="peDetail.type" type="button">
              <Radio
                v-for="(item, index) in CONSTANTS.NODE_TYPE"
                :label="item.value"
                :key="index"
              >{{item.desc}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="执行组件" prop="executeCompoment">
            <Input v-model="peDetail.executeCompoment" />
          </FormItem>
          <FormItem label="超时时间" prop="maxExeTime">
            <Input v-model="peDetail.maxExeTime" />
          </FormItem>
          <FormItem label="是否同步" prop="isSync">
            <i-switch v-model="peDetail.isSync"></i-switch>
          </FormItem>
          <FormItem label="块名称" prop="stage">
            <Input v-model="peDetail.stage" />
          </FormItem>
          <FormItem label="是否保护" prop="isProtected">
            <i-switch v-model="peDetail.isProtected"></i-switch>
          </FormItem>
        </Form>
      </Card>
    </div>
  </Card>
</template>

<script>
import { getProcessNodeData } from "@/api/data";
import Util from "@antv/util";
import renderG6 from "./renderG6";
import {
  convertG6DataToTemplate,
  convertTemplateToG6Data
} from "./dataConvert";

import CONSTANTS from "./constants";

export default {
  data() {
    return {
      id: Util.uniqueId(),
      graph: null,
      nodes: [],

      CONSTANTS: CONSTANTS,

      peDetail: {
        name: "",
        type: 0,
        executeCompoment: "",
        maxExeTime: 0,
        isSync: true,
        stage: "",
        isProtected: true
      }
    };
  },

  methods: {
    searchProcessNode(data) {
      const param = { processId: data };
      getProcessNodeData(param).then(res => {
        if (res.success) {
          const nodes = res.data || [];
          this.canvasG6(this.id, nodes);
        } else {
          this.$Notice.error({
            desc: res.resultMsg
          });
        }
      });
    },

    /**
     * 流程图渲染
     */
    canvasG6(id, processData) {
      if (this.graph) {
        const newData = convertTemplateToG6Data(processData);
        this.graph.changeData(newData);
      } else {
        this.graph = renderG6(id, processData, {
          onFocusNode: this.handleFoucsNode
        });
      }

      this.peDetail = this.graph._cfg.data.nodes[0];
    },

    /**
     * node节点单击事件
     */
    handleFoucsNode(model) {
      this.peDetail = model;
    }
  },

  mounted() {
    const processId = this.$route.params.processId;
    this.searchProcessNode(processId);
  }
};
</script>

<style lang="less">
.pe-detail {
  position: absolute;
  top: 100px;
  right: 10px;
  width: 300px;
  z-index: 100;
}
</style>
