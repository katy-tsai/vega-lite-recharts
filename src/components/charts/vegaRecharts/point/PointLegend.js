import React from 'react';

const PointLegend = ({ payload, iconType, iconSize }) => {
    console.log(payload);
    return (
        <ul className="scatter-lender-ul">
            {
                payload.map((entry, index) => {
                    const { stroke, fill } = entry.payload;
                    return <li key={`PointLegend-${index}`} style={{ color: stroke || fill }}>
                        <span
                            className={["legendIcon", iconType].join(" ")}
                            style={{ border: `1px solid ${stroke}`, backgroundColor: fill, width: `${iconSize}px`, height: `${iconSize}px` }}>

                        </span>
                        {entry.value}
                    </li>
                })
            }
        </ul>
    );
};

export default PointLegend;