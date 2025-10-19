export default function DeviceList( { deviceList, removeDevice }) {
    return(
        <div>
            <ul>{deviceList.map(({device, hours}, index) => (
                <li key={index} className="my-device">
                    {device} - {hours} hrs/day
                    <button onClick={() => removeDevice(index)}>-</button>
                </li>
            ))}
            </ul>
        </div>
    )
}