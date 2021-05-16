import axios from "axios";
import React, { useEffect, useState } from "react";

function MockData() {
  const [state, setState] = useState({});

  const getData = async () => {
    let result = await axios.get(
      "https://www.sherpa-tech.com/medical_facility/wp-json/wp/v2/pages/161"
    );

    let finalResult = result.data;
    console.log(finalResult);

    setState(finalResult);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {/* <ul>
        {Object.keys(state).map((key) => (
          <li key={key}>{state[key].rendered}</li>
        ))}
      </ul> */}
      {state.acf.gallary.sizes.url}
    </div>
  );
}

export default MockData;
