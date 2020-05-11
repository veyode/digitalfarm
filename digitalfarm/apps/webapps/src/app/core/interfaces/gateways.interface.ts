export interface GatewaysInterface {

  connected: any,
  date_modified: any,
  visibility: any,
  owner: any,
  name: any,
  id: any,
  date_created: any,
  location:{latitude:any,longitude:any},
  devices: [
    {
      gateway_id: any,
      date_modified: any,
      owner: any,
      name: any,
      id: any
    }
  ]
}
