import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { DB_LINK } from "Constants/link";

const columns = [
  { field: "name", headerName: "NAME", width: 130 },
  { field: "email", headerName: "Email Address", width: 130 },
  { field: "city", headerName: "CITY", width: 130 },
  { field: "state", headerName: "STATE", width: 130 },
  { field: "phoneNumber", headerName: "PHONE NUMBER", width: 130 },
  { field: "amount", headerName: "Transactions", width:130 },
  { field: "password", headerName: "PASSWORD", width: 130 },
  { field: "adharNumber", headerName: "Adhar Number", width: 130 },
  { field: "panNumber", headerName: "Pan Number", width: 130 },
];

function ViewAccounts() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [tableData, setTableData] = useState(null);
  const [filteredTableData, setFilteredTableData] = useState(null);
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios
      .post(`${DB_LINK}/getAgentPdo/${loggedInUser.userId}`)
      .then((res) => {
        setTableData(res.data.data)
        setFilteredTableData(res.data.data)
      });
  }, []);

  useEffect(()=> {
    const filteredData = tableData?.filter(item => {
      if(item.name.toLowerCase().includes(search.toLowerCase())) return item;
    })
    setFilteredTableData(filteredData)
  },[search])

  
  return (
    <>
    <div
    className="mt-7 h-max w-full"
    style={{ height: "100vh", width: "100%" }}
    >
    <div className="justify-between flex mb-3">
    <div>
    <h1 className="text-red-500 mb-2">*These are the PDO's data which are created by you</h1>
    </div>

    <div>
    <input className="border border-gray-600 outline-gray-500 rounded-md px-2 py-1" spellCheck={false} placeholder="Search by name" onChange={e => setSearch(e.target.value)}/>
    </div>

    </div>
      <DataGrid
        rows={filteredTableData ? filteredTableData : []}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row.name}
        rowsPerPageOptions={[5]}
      />
    </div>
    </>
  );
}

export default ViewAccounts;
