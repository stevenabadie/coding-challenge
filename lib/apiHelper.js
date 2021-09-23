const blockHandler = (id, { mutate }) => {
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

export { blockHandler, resolveHandler };
