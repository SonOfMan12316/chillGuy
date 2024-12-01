import useFormattedDayAndTime from "./lib/utils/date";
import ChillGuySection from "./components/drag-section";
import Option from "./components/option";

const App = () => {
  const time = useFormattedDayAndTime();
  return (
    <div className="bg bg-opacity-100 h-full w-screen app">
      <div className="font-iBM text-xs">{time}</div>
      <div className="overflow-scroll">
        <div className="flex flex-col gap-8">
          <ChillGuySection />
          <Option />
        </div>
      </div>
    </div>
  );
};

export default App;
