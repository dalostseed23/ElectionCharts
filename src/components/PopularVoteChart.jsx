import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell} from 'recharts';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import theme from '../theme/theme';
import '../theme/theme.css';

const Custom = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, fill } = payload[0];
    return (
      <div style={{ backgroundColor: theme.cardBg, padding: 8, color: theme.text, border: `1px solid ${theme.grey}`, borderRadius: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 12, height: 12, backgroundColor: fill, marginRight: 8 }} />
          <strong>{name}</strong>: {value}%
        </div>
      </div>
    );
  }
  return null;
};

const PopularVoteChart = ({ data, title, subtitle, label }) => (
  <Card className="rounded-4 border-0 shadow-lg card-dark">
    <Card.Body>
      <Card.Title className="mb-2 text-xl">
        <FontAwesomeIcon icon={faChartBar} className="me-2 mr-2" />{title}
      </Card.Title>
      <Card.Subtitle className="mb-4 text-muted">{subtitle}</Card.Subtitle>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridStroke} />
          <XAxis type="number" domain={[0, 50]} tick={{ fill: theme.textMuted }} />
          <YAxis dataKey="name" type="category" width={110} tick={{ fill: theme.textMuted }} />
          <Tooltip content={<Custom />} formatter={(value) => `${value}%`} />
          <Bar dataKey="percentage" name={label}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card.Body>
  </Card>
);

export default PopularVoteChart;
