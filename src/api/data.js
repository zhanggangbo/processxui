import axios from "@/libs/api.request";

export const getProcessPageData = param => {
  return axios.request({
    url: "/process/page.json",
    method: "get",
    params: param,
  });
};

export const getProcessNodeData = param => {
  return axios.request({
    url: "/process/node.json",
    method: "get",
    params: param,
  });
};

export const getProcessInstancePageData = param => {
  return axios.request({
    url: "/process_instance/page.json",
    method: "get",
    params: param,
  });
};

export const getProcessNodeInstanceData = param => {
  return axios.request({
    url: "/process_instance/node.json",
    method: "get",
    params: param,
  });
};
