import { atom } from "recoil";


export const isAuthenticatedState = atom({
    key: 'isAuthenticatedState',
    default: false, // Initialize as not authenticated
  });

  export const WebViewUrl = atom({
    key : "WebViewUrl" ,
    default : false
  })

  export const uidState = atom({
    key : "uidState" ,
    default : null
  })

  export const UserRes = atom({
    key : 'UserRes' ,
    default : null
  })
  

  export const ConfirmPopUp = atom({
    key : "Credential" ,
    default : false
  })

  export const PlaceState = atom({
    key : "PlaceState" ,
    default : null
  })

  export const LocationState = ({
    key : 'LocationState' ,
    default : null
  })

  export const User_id = atom({
    key : 'User_id' ,
    default : null
  })


  export const device_number = atom({
    key : 'device_number' ,
    default : null
  })

  export const ISLocationEnable = atom({
    key : "ISLocationEnable",
    default:false
  })

  export const LOCATION_DATA = atom({
    key : "LOCATION_DATA" ,
    default : null
  })

  export const LOGIN_CHECKING = atom({
    key : "LOGIN_CHECKING" ,
    default : null
  })