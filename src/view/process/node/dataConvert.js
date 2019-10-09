/* eslint no-param-reassign: 0 */
import dagre from "dagre";

function convertG6DataToTemplate(data) {
  const ret = data.source.nodes.map(node => {
    const retNode = {
      frontId: node.id,
      nodeType: node.type,
      name: node.name,
      executeCompoment: node.executeCompoment,
      maxExeTime: node.maxExeTime,
      isSync: node.isSync,
      stage: node.stage,
      isProtected: node.isProtected,
      preNodeId: []
    };
    if (!node.new) {
      // 从字符串转成数字id
      retNode.id = parseInt(node.id, 10);
      retNode.frontId = parseInt(node.id, 10);
    }
    return retNode;
  });

  const map = {};
  ret.forEach(n => {
    map[n.frontId] = n;
  });

  data.source.edges.forEach(e => {
    map[e.target].preNodeId.push(e.source);
  });

  ret.forEach(n => {
    n.preNodeId = n.preNodeId.join(",");
  });

  return ret;
}

export default function convertTemplateToG6Data(templates) {
  const data = {
    nodes: [],
    edges: []
  };
  if (templates.length === 0) return data;

  const g = new dagre.graphlib.Graph(); // dagre的Graph对象

  g.setGraph({
    rankdir: "TB" // 表示方向，可以是TB, BT, LR, RL
  });

  g.setDefaultEdgeLabel(() => ({}));

  // 添加节点
  templates.forEach(node => {
    g.setNode(node.id, { node, width: 300, height: 10 });
  });

  // 添加边
  templates.forEach(node => {
    const preNodeId = node.preNodeId || "";
    const preNodeIds = preNodeId.length > 0 ? preNodeId.split(",") : [];
    preNodeIds.forEach(preNodeId => {
      g.setEdge(preNodeId, node.id);
    });
  });

  // 自动布局
  dagre.layout(g);

  g.nodes().forEach(v => {
    const gnode = g.node(v);
    const node = gnode.node;
    const retNode = {
      shape: "showNode",
      id: node.id,
      type: node.nodeType,
      name: node.name,
      executeCompoment: node.executeCompoment,
      maxExeTime: node.maxExeTime,
      isSync: node.isSync,
      stage: node.stage,
      isProtected: node.isProtected,
      x: gnode.x,
      y: gnode.y
    };

    data.nodes.push(retNode);
  });

  g.edges().forEach(e => {
    const edge = g.edge(e);
    data.edges.push({
      shape: "line",
      source: e.v,
      target: e.w,
      id: `${e.v}_${e.w}`,
      controlPoints: edge.points,

      style: {
        endArrow: true,
        stroke: "#008DE8",
        lineWidth: 1
      }
    });
  });

  return data;
}

export { convertG6DataToTemplate, convertTemplateToG6Data };