import React, { useEffect } from "react";

function Table() {
  const getData = async () => {
    let result = await axios.get(
      "https://www.sherpa-tech.com/medical_facility/wp-json/wp/v2/hospital"
    );
    let users = await result.data;
    setData(users);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return <div></div>;
}

export default Table;
