import useFormattedDayAndTime from "./lib/utils/date";
import ChillGuySection from "./components/drag-section";

const App = () => {
  const time = useFormattedDayAndTime();
  return (
    <div className="mx-2">
      <div className="font-iBM text-xs">{time}</div>
      <ChillGuySection />
    </div>
  );
};

export default App;
