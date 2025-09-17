
interface Props {
  day: string;
}

const DayCard = ({ day }: Props) => {
  return <div className="day-card">{day}</div>;
};

export default DayCard;
