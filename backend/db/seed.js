// TODO:
import db from "#db/client";
import { createUser } from "./queries/users";
import { addUserDevice } from "./queries/user_devices";
import { createDevice } from "./queries/devices";
import { createUtility } from "./queries/utilities";
import {faker} from '@faker-js/faker'

// seed verified device list
const seed = async()=>{
    const users =[]
    for(let i=0; i<10;i++){
        const newUser = {
            name : faker.person.firstName() +" "+ faker.person.lastName(),
            location :
            username : 
            password :
        }
        const databaseUser = await addUserDevice(newUser)
        users.push(databaseUser)
    }
// seed utility and rates
    for(let x = 0; x<10;x++){
        const newDevice = {
            name : faker.device.deviceName(),
            wattage :
            category :
        }
    }
}

// seed some users to test capabilities
