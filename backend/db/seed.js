import {faker} from '@faker-js/faker';

import db from "./client.js";

import { createUser } from "./queries/users.js";
import { addUserDevice } from "./queries/user_devices.js";
import { createDevice } from "./queries/devices.js";
import { createUtility } from "./queries/utilities.js";

// seed some users to test capabilities
const seed = async()=>{
    const users =[];
    for(let i=0; i<10;i++){
        const newUser = {
            name : faker.person.firstName() +" "+ faker.person.lastName(),
            location : faker.location.city(),
            username : faker.internet.username(),
            password : faker.internet.password({ length: 20, memorable: true }) 
        };
        console.log(newUser)
        const databaseUser = await createUser(newUser);
        users.push(databaseUser);
    };
    
    // seed verified device list
    const devices = [];
    for(let x = 0; x<10;x++){
        const newDevice = {
            name : faker.lorem.word(),
            wattage : Math.floor(faker.number.float({ min: 0, max: 10000})),
            verified : true
        };
        const databaseDevice = await createDevice(newDevice);
        devices.push(databaseDevice);
    }

    // seed utility and rates
    const utilities = [];
    for(let u = 0; u<10;u++){
        const offPeakRate = faker.number.float({ min: 0.05, max: 0.25 });
        const peakRate = faker.number.float({ min: offPeakRate + 0.01, max: offPeakRate + 0.5 });

        const newUtility = {
            name : faker.company.name(),
            location : faker.location.city(),
            peakRate : parseFloat(peakRate.toFixed(2)),
            offPeakRate : parseFloat(offPeakRate.toFixed(2))
        };
        const databaseUtility = await createUtility(newUtility);
        utilities.push(databaseUtility);
    };

    // seed userdevices multiple devices per user
    // maps algorithms to hours
    const userDevices = [];
    const usageAlgorithmMap = {
        "all the time": 24,
        "during the day": faker.number.float({ min: 8, max: 12 }),
        "at night": faker.number.float({ min: 8, max: 10 }),
        "only on weekends": faker.number.float({ min: 16, max: 20 }),
        "peak hours only": faker.number.float({ min: 4, max: 6 }),
        "off-peak only": faker.number.float({ min: 6, max: 10 }),
        "seasonal usage": faker.number.float({ min: 0, max: 12 }),
        "motion-triggered": faker.number.float({ min: 0.5, max: 2, precision: 0.1 }),
        "manual override": faker.number.float({ min: 1, max: 4 }),
        "smart schedule": faker.number.float({ min: 4, max: 10 }),
        "once a day": faker.number.float({ min: 0.5, max: 1, precision: 0.1 }),
        "once a week": faker.number.float({ min: 0.5, max: 2, precision: 0.1 }),
        "once a month": faker.number.float({ min: 1, max: 3, precision: 0.1 })
    };

    const usageAlgorithms = Object.keys(usageAlgorithmMap);
    //assigns 1-3 devices for user from users list
    for (const user of users) {
        const assignedDevices = faker.helpers.arrayElements(devices, { min: 1, max: 3 });
        // Checks for verified devices
        for (const device of assignedDevices) {
            const useCustom = faker.datatype.boolean();
            // adds unverified custom device
            const deviceToUse = useCustom
                ? await createDevice({
                    name: faker.word.words({ count: 2 }),
                    wattage: Math.floor(faker.number.float({ min: 0, max: 10000 })),
                    verified: false
                })
            : device;
            // applies usage and hours to user device
            const usageAlgorithm = faker.helpers.arrayElement(usageAlgorithms);
            const usageHours = usageAlgorithmMap[usageAlgorithm];

            const databaseUserDevices = await addUserDevice(
            user.id,
            deviceToUse.id,
            deviceToUse.name,
            usageAlgorithm,
            Math.floor(usageHours)
            );
            userDevices.push(databaseUserDevices);
        }
    }
};

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");