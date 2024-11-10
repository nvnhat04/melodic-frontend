import StatCard from "./StatCard";

export default function Revenue() {
  return (
    <StatCard
      title="Revenue"
      value="$1 200 000"
      percentageChange="8.3"
      increase={false}
    />
  );
}
