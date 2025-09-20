
interface DayCardProps {
  day: string;
}

const DayCard = ({ day }: DayCardProps) => {
  return <div className="day-card">{day}</div>;
};

export default DayCard;
