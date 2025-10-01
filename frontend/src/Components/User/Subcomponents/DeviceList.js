export default function DeviceList( { deviceList, removeDevice }) {
    return(
        <div>
            <ul>{deviceList.map((device) => (
                <li key={device.id}>
                    {device.name} - {device.hours} hrs/day
                    <button onClick={() => removeDevice(device.id)}>-</button>
                </li>
            ))}
            </ul>
        </div>
    )
}