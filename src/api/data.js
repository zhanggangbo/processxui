import axios from "@/libs/api.request";

export const getProcessPageData = param => {
  console.log("getProcessPageData", param);
  return axios.request({
    url: "/process/page.json",
    method: "get",
    data: param,
  });
};

export const getProcessNodeData = param => {
  console.log("getProcessNodeData", param);
  return axios.request({
    url: "/process/node.json",
    method: "get",
    data: param,
  });
};

export const getProcessInstancePageData = param => {
  console.log("getProcessInstancePageData", param);
  return axios.request({
    url: "/process_instance/page.json",
    method: "get",
    data: param,
  });
};

export const getProcessNodeInstanceData = param => {
  console.log("getProcessNodeInstanceData", param);
  return axios.request({
    url: "/process_instance/node.json",
    method: "get",
    data: param,
  });
};
