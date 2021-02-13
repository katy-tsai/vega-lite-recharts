import React from 'react';

const PieTooltip = ({ active, payload }) => {
  return active ? (
    <div className="custom-tooltip">
      <ul className="tooltip-ul">
        {
          payload.map((data, index) => {
            const obj = data.payload;
            return (
              <li className="tooltip-li" key={`payload_${index}`}>
                <div className="tooltip-name" >
                  <span className="point" style={{ backgroundColor: obj.fill }}></span>
                  {data.name}
                </div>
                <div className="tooltip-value">{data.value}%</div>
              </li>
            )
          })
        }

      </ul>
    </div>
  ) : null;

};

export default PieTooltip;