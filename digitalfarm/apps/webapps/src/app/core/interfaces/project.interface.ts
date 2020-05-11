export interface ProjectInterface {
  owner: any,
  name: any,
  id: any,
  gateways: [

    {
      connected: boolean,
      date_modified: any,
      location: {latitude: any, longitude: any}
      visibility: any,
      owner: any,
      name: any,
      id: any,
      date_created: any
    }
  ],
  devices: [
    {
      id:any,
      name: string,
      location:{latitude:any,longitude:any},
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
    }
  ],
  device_ids: [],
  gateway_ids: []
}
