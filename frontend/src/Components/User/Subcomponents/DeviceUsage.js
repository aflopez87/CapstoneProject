import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

export default function DeviceUsage({ usageHours, setUsageHours }){
    const [algorithmMap, setAlgorithmMap] = useState({});

    useEffect = (() => {
        const map = {
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
        setAlgorithmMap(map);
    }, []);

    function handleChange(e) {
        const algorithm = e.target.value;
        const hours = algorithmMap[algorithm];
        setUsageHours(hours);
    }
    return (
        <select onChange={handleChange}>
            <option value="">Select your usage pattern</option>
            {Object.keys(algorithmMap).map((key) => (
                <option key={key} value={key}>
                    {key}
                </option>
            ))}
        </select>
    );
}

