export interface SensorsInterface {
  quantity_kind: any,
  value: {date_received: any, value: any, timestamp: any},
  name: any,
  id: any,
  calib: {linear: {
      enabled: any,
      value_max: {sensor_value: any, real_value: any}
      value_min: {sensor_value: any, real_value:any}
    }},
  unit: any,
  sensor_kind: any,
}
