import useSWR, { useSWRConfig } from "swr";
import Report from "./Report";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ReportList = () => {
  // SWR provides a mutate function to manually revalidate and refetch data other than the
  // automated revalidation it provides
  const { data, error } = useSWR("/api/reports", fetcher);
  const { mutate } = useSWRConfig();

  return (
    <div className="space-y-6">
      {error && (
        <>
          <div>Oh no, something broke. There has been an error</div>
          <div>{error}</div>
        </>
      )}
      {!data && <div>loading...</div>}
      {data &&
        data.map((report) => (
          <Report key={report.id} report={report} mutate={mutate} />
        ))}
    </div>
  );
};

export default ReportList;
