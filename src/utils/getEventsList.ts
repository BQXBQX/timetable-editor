import { toast } from "sonner";

const baseURL = "https://evento.sast.fun/api";

export const getEventsList = async () => {
  try {
    const response = await fetch(`${baseURL}/event/list?size=7`);
    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`HTTP 错误! 状态: ${response.status}`);
    }
    const data = await response.json();
    if (data.errCode) {
      toast.error(data.errMsg);
    } else return data.data.result;
  } catch (error) {
    console.error("获取事件列表时出错:", error);
  }
};
