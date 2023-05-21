import { DataGrid } from "@mui/x-data-grid"
import { DB_LINK } from "Constants/link";
import axios from "axios"
import { useEffect, useState } from "react"

const columns = [
    { field: "name", headerName: "NAME", width: 130 },
    { field: "email", headerName: "Email Address", width: 130 },
    { field: "city", headerName: "CITY", width: 130 },
    { field: "state", headerName: "STATE", width: 130 },
    { field: "phoneNumber", headerName: "PHONE NUMBER", width: 130 },
    { field: "role", headerName: "ROLE", width: 130 },
    { field: "amount", headerName: "Transactions", width: 130 },
    { field: "password", headerName: "PASSWORD", width: 130 },
    { field: "createdBy", headerName: "CREATED BY", width: 130 },
    { field: "adharNumber", headerName: "Adhar Number", width: 130 },
    { field: "panNumber", headerName: "Pan Number", width: 130 },
  ];

function AdminViews(){
    const [tableData, setTableData] = useState(null)
    const [search, setSearch] = useState("")
    const [filteredTableData, setFilteredTableData] = useState(null)

    useEffect(()=> {
        axios.get(`${DB_LINK}/getAllDetails`)
    .then(res => {
      setTableData(res.data.response)
      setFilteredTableData(res.data.response)
    })
    },[])

    useEffect(()=> {
      const filteredData = tableData?.filter(item => {
        if(item.name.toLowerCase().includes(search.toLowerCase())) return item;
      })
      setFilteredTableData(filteredData)
    },[search])

    // console.log(tableData)
    return (
        <>
        <div
        className="mt-7 h-max w-full"
        style={{ height: "100vh", width: "100%" }}
        >

        <div className="flex justify-between mb-3">
        <div>
        <h1 className="text-red-500 mb-2">*All user data in the application</h1>
        </div>

        <div className="float-right">
        <input className="border border-gray-600 outline-gray-500 rounded-md px-2 py-1" onChange={e => setSearch(e.target.value)} spellCheck={false} placeholder="Search by name"/>
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
    )
}

export default AdminViews