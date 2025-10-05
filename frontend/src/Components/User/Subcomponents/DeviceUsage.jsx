import { useEffect, useState } from "react";


export default function DeviceUsage({ usageHours, setUsageHours }){
    const [algorithmMap, setAlgorithmMap] = useState({});

    useEffect(() => {
        const map = {
            "all the time": 24,
            "during the day": randomFloat(8, 12),
            "at night": randomFloat(8, 10),
            "only on weekends": randomFloat(16, 20),
            "peak hours only": randomFloat(4, 6),
            "off-peak only": randomFloat(6, 10),
            "seasonal usage": randomFloat(0, 12),
            "motion-triggered": randomFloat(0.5, 2, 1),
            "manual override": randomFloat(1, 4),
            "smart schedule": randomFloat(4, 10),
            "once a day": randomFloat(0.5, 1, 1),
            "once a week": randomFloat(0.5, 2, 1),
            "once a month": randomFloat(1, 3, 1)
        };
        setAlgorithmMap(map);
    }, []);

    function randomFloat(min, max, precision = 1){
        const factor = Math.pow(10, precision);
        return Math.round((Math.random() * (max - min)+ min) * factor) / factor;
    }

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

