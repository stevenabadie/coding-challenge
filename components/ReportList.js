import useSWR, { useSWRConfig } from "swr";
import Report from "./Report";

const blockHandler = (id) => {
  fetch(["/api/reports/", id].join(""), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blockState: true }),
  });
  mutate("/api/reports");
};

const resolveHandler = (id, { mutate }) => {
  fetch(["/api/reports/", id].join(""), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reportState: "CLOSED" }),
  });
  mutate("/api/reports");
};

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
          <Report
            key={report.id}
            report={report}
            resolveHandler={resolveHandler}
            blockHandler={blockHandler}
            mutate={mutate}
          />
        ))}
    </div>
  );
};

export default ReportList;
