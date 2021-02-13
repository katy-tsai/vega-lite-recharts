import React from 'react';

const LineTooltip = ({ active, payload, label }) => {
    return active ? (
        <div className="custom-tooltip">
            <p className="tooltip-label">{label}</p>
            <ul className="tooltip-ul">
                {
                    payload && payload.map((obj, index) => {
                        return (
                            <li className="tooltip-li" key={`payload_${index}`}>
                                <div className="tooltip-name" >
                                    <span className="point" style={{ backgroundColor: obj.stroke }}></span>
                                    {obj.name}
                                </div>
                                <div className="tooltip-value">{obj.value}</div>
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    ) : null;
};

export default LineTooltip;