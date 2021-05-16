import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HospitalList.css";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import MockData from "./MockData";
function App() {
  const [data, setData] = useState([]);

  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(true);
  const url =
    "https://www.sherpa-tech.com/medical_facility/wp-json/wp/v2/hospital?posts_per_page=300";
  const getData = async () => {
    let result = await axios.get(url);
    let users = await result.data;
    setData(users);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ width: "90%", margin: "0 auto", paddingBottom: "100px" }}>
      <p className="header">Source:- Government of Nepal</p>
      <p className="header1">Country:- Nepal</p>
      <div className="searchContainer">
        <input
          className="searchInput"
          type="text"
          placeholder="Search for a Address"
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
      </div>
      {loading ? (
        <h4
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "300px",
            margin: "auto",
          }}
        >
          Wait a second...
          <CircularProgress />
        </h4>
      ) : (
        <div>
          <Table striped bordered hover size="sm" responsive="sm">
            <thead>
              <tr>
                <th>NAME OF HOSPITAL</th>
                <th>COVID PATIENTS</th>
                <th>AVAILABLE ICU BEDS</th>
                <th>DISCHARGE PATIENTS</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((list) => {
                  if (searchItem === "") {
                    return list;
                  } else if (
                    list.acf.address
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return list;
                  }
                })
                .map((list) => (
                  <tr key={list.id}>
                    <td>
                      {list.title.rendered}
                      <br />
                      <small>{list.acf.phone}</small>

                      <small style={{ color: "#4284f5", marginLeft: "7px" }}>
                        {list.acf.address}
                      </small>
                    </td>
                    <td>{list.acf.covid_patients} </td>
                    <td>{list.acf.icu_beds}</td>
                    <td>{list.acf.discharge}</td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <div className="footer">
            <p>
              Coordination with:- Lorem ipsum dolor, sit amet consectetur
              adipisicing elit. Numquam, consequuntur!
            </p>
            <p> Supported by:- Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      )}
      <MockData />
    </div>
  );
}

export default App;
