import Link from "next/link";

const Report = ({ report, blockHandler, resolveHandler, mutate }) => (
  <div className="grid grid-cols-3 gap-4 border-2 rounded-lg p-4">
    <div>id: {report.id.substr(-12)}</div>
    <div>Type: {report.reportType}</div>
    {/* There should probably be a method of unblocking a report */}
    <button
      onClick={() => blockHandler(report.id, { mutate })}
      className={`p-1 ${!report.blockState ? "bg-gray-300" : "bg-gray-400"}`}
    >
      Block
    </button>
    <div>State: {report.reportState}</div>
    <div className="truncate">
      Message: {report.message ? report.message : "None"}
    </div>
    <button
      onClick={() => resolveHandler(report.id, { mutate })}
      className="bg-gray-300 p-1"
    >
      Resolve
    </button>
    <Link href="/">
      <a className="text-blue-600">Details</a>
    </Link>
  </div>
);

export default Report;
