export interface DeviceInterface {
  gateway_id: string,
  date_modified: any,
  location:{latitude:any,longitude:any},
  domain: string,
  visibility: string,
  owner:string,
  name: string,
  id: any,
  sensors: [
    {
      quantity_kind: any,
      value: {date_received: any, value:any, timestamp: any},
      name: any,
      id: any,
      calib: {linear: {

        }},
      unit: any,
      sensor_kind: any
    }
  ],
  actuators: [
    {
      actuator_value_type:any,
      value:any,
      actuator_kind:any,
      name:any,
      id:any
    }

  ],
  date_created: any
}
