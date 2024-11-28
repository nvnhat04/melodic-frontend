import StatCard from './StatCard';

export default function MonthlyListeners() {
  return (
    <StatCard
      title="Monthly Listeners"
      value="120 000 000"
      percentageChange="12.5"
      increase={true}
    />
  );
}