export interface Event {
  departments: Department[];
  /**
   * 活动简介
   */
  description: string;
  /**
   * 分类id
   */
  eventType: EventType;
  /**
   * 活动截至时间
   */
  gmtEventEnd: string;
  /**
   * 活动开始时间
   */
  gmtEventStart: string;
  /**
   * 活动报名截至时间
   */
  gmtRegistrationEnd: string;
  /**
   * 活动报名开始时间
   */
  gmtRegistrationStart: string;
  /**
   * 活动id
   */
  id: number;
  location: string;
  /**
   * 地点id
   */
  locationId: number;
  /**
   * 状态:1未开始,2签到中,3进行中,4已取消,5已结束
   */
  state: number;
  /**
   * 活动标签
   */
  tag: string;
  /**
   * 活动标题
   */
  title: string;
  [property: string]: any;
}

/**
 * department，部门表
 */
export interface Department {
  /**
   * 部门名
   */
  departmentName: string;
  /**
   * 部门id
   */
  id: number;
  [property: string]: any;
}

export interface EventType {
  /**
   * 是否允许冲突
   */
  allowConflict: boolean;
  /**
   * 分类id
   */
  id: number;
  /**
   * 活动分类名
   */
  typeName: string;
  [property: string]: any;
}
