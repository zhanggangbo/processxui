import G6 from "@antv/g6";
import convertG6DataToTemplate from "./dataConvert";

import CONSTANTS from "./constants";

import autoPath from "@/assets/images/auto.svg";
import triggerPath from "@/assets/images/trigger.svg";
import gatewayPath from "@/assets/images/gateway.svg";
import schedulePath from "@/assets/images/schedule.svg";

const iconPaths = {
  auto: autoPath,
  trigger: triggerPath,
  gateway: gatewayPath,
  schedule: schedulePath,
};

const colors = {
  main: "#008DE8",
  gray: "#ccc",
  grayBlue: "#c7d1d8",
  start: "#52ca47",
  end: "#008DE8",
  waiting: "#fbd702",
  error: "#ff5959",
};

export default function renderG6(id, template, options) {
  const opts = {
    onFocusNode: () => {},
    ...options,
  };
  const data = convertG6DataToTemplate(template);

  // 注册图形
  G6.registerNode("showNode", {
    draw(cfg, group) {
      let width = 60;
      const height = 60;
      const labelMarginTop = 10;

      // 测绘Name长度
      const text = group.addShape("text", {
        attrs: {
          x: cfg.x,
          y: cfg.y + height / 2 + labelMarginTop,
          text: cfg.stage,
          textAlign: "center",
          textBaseline: "top",
          fill: "transparent",
        },
      });

      const metricsWidth = text.measureText();

      // 绘制底纹
      width += metricsWidth + height / 2;
      const shape = group.addShape("rect", {
        attrs: {
          x: cfg.x - width / 2,
          y: cfg.y - height / 2,
          width,
          stroke: colors.main,
          fill: "#fff",
          height,
          radius: height / 2,
        },
      });
      
      // 绘制icon
      const iconHeight = 30;
      const iconWidth = 30;
      const imgTag = CONSTANTS.NODE_TYPE[cfg.type].code;
      group.addShape("image", {
        attrs: {
          x: cfg.x - width / 2 + (height - iconHeight) / 2,
          y: cfg.y - iconHeight / 2,
          img: iconPaths[imgTag],
          height: iconHeight,
          width: iconWidth,
        },
      });

      // 绘制name
      group.addShape("text", {
        attrs: {
          x: cfg.x - width / 2 + height,
          y: cfg.y,
          text: cfg.stage,
          textAlign: "left",
          textBaseline: "middle",
          fill: colors.main,
        },
      });

      return shape;
    },
    // 设置锚点
    getAnchorPoints() {
      return [
        [0.5, 1], // 上面边的中点
        [0.5, 0], // 下边边的中点
      ];
    },
  });

  /**
   * 配置画布
   *
   * https://www.yuque.com/antv/g6/graph
   */
  const graph = new G6.Graph({
    /** 容器ID */
    container: id,
    /** 画布高 */
    height: window.outerHeight, // 画布高
    width: 500,
    modes: {
      default: ["click-select", "drag-canvas", "zoom-canvas"],
    },
  });

  graph.on("node:click", ev => {
    const node = ev.item;
    opts.onFocusNode(node._cfg.model);
  });

  graph.data(data);
  graph.render();
  graph.fitView();
  return graph;
}
