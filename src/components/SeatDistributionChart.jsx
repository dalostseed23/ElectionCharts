import { useState } from 'react';
import { PieChart, Pie, Cell, Sector, ResponsiveContainer, Legend } from 'recharts';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';
import theme from '../theme/theme';
import '../theme/theme.css';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={theme.text} fontWeight="bold">{payload.name}</text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill={theme.textMuted}>{`${payload.seats} Seats (${(percent * 100).toFixed(1)}%)`}</text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  );
};

const SeatDistributionChart = ({ data, title, subtitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Card className="rounded-4 border-0 shadow-lg card-dark">
      <Card.Body>
        <Card.Title className="mb-2 text-xl">
          <FontAwesomeIcon icon={faLandmark} className="me-2 mr-2" />{title}
        </Card.Title>
        <Card.Subtitle className="mb-4 text-muted">{subtitle}</Card.Subtitle>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              dataKey="seats"
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
            </Pie>
            <Legend
              iconType="circle"
              formatter={(value, entry) => <span style={{ color: theme.textMuted }}>{`${entry.payload.name} (${entry.payload.seats})`}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default SeatDistributionChart;
