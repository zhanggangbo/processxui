import Mock from "mockjs";
import {
  getProcessPageData,
  getProcessNodeData,
  getProcessInstancePageData,
  getProcessNodeInstanceData,
} from "./data";

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 500,
});

Mock.mock(/http:\/\/localhost:8080\/process\/page.json/, getProcessPageData);
Mock.mock(/http:\/\/localhost:8080\/process\/node.json/, getProcessNodeData);
Mock.mock(
  /http:\/\/localhost:8080\/process_instance\/page.json/,
  getProcessInstancePageData
);
Mock.mock(
  /http:\/\/localhost:8080\/process_instance\/node.json/,
  getProcessNodeInstanceData
);

export default Mock;
