export default function DeviceList( { deviceList, removeDevice }) {
    return(
        <div>
            <ul>{deviceList.map(({device, hours}, index) => (
                <li key={index} className="my-device">
                    <div className="device-added">{device}</div> <div className="device-usage">{hours} hrs/day</div>
                    <button className="device-remove" onClick={() => removeDevice(index)}>-</button>
                </li>
            ))}
            </ul>
        </div>
    )
}