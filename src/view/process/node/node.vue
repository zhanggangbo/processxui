<template>
  <div>{{nodes}}</div>
</template>
<script>
import { getProcessNodeData } from "@/api/data";
export default {
  data() {
    return {
      nodes: []
    };
  },
  methods: {
    searchProcessNode(data) {
      const param = { processId: data };
      getProcessNodeData(param).then(res => {
        if (res.success) {
          const nodes = res.data || [];
          this.nodes = nodes;
        } else {
          this.$Notice.error({
            desc: res.resultMsg
          });
        }
      });
    }
  },

  mounted() {
    const processId = this.$route.params.processId;
    this.searchProcessNode(processId);
  }
};
</script>
