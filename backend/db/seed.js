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
            location : faker.location.city(),
            username : faker.internet.username(),
            password : faker.internet.password({ length: 20, memorable: true }) 
        }
        const databaseUser = await createUser(newUser)
        users.push(databaseUser)
    }
// seed utility and rates
    for(let x = 0; x<10;x++){
        const newDevice = {
            name : faker.device.deviceName(),
            wattage : Math.floor(faker.number.float({ min: 0, max: 10000}))
        }
        const databaseDevice = await createDevice(newDevice)
        device.push(databaseDevice)
    }
    for(let u = 0; u<10;u++){
        const offPeakRate = faker.number.float({ min: 0.05, max: 0.25 });
        const peakRate = faker.number.float({ min: offPeakRate + 0.01, max: offPeakRate + 0.5 });

        const newUtility = {
            name : faker.utility.utilityName(),
            location : faker.location.city(),
            peakRate : parseFloat(peakRate.toFixed(2)),
            offPeakRate : parseFloat(offPeakRate.toFixed(2))
        }
        const databaseUtility = await createUtility(newUtility)
        utility.push(databaseUtility)
    }
}

// seed some users to test capabilities
