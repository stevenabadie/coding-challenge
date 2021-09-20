import ReportList from "@/components/ReportList";

const Home = () => (
  // Does this need to be styled for mobile?
  <div className="max-w-2xl mx-auto py-24 space-y-4">
    <div className="text-xl px-4">Reports</div>
    <ReportList />
  </div>
);

export default Home;
