const fetchDatoCms = async (query: any) => {
  const res = await fetch("https://graphql.datocms.com/", {
    next: { revalidate: 30 },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  return data.data;
};

export default fetchDatoCms;
