import { useState } from "react";

function PaginatedTable({ data, setSelected, close, pageSize }) {
  const [page, setPage] = useState(1);
  // const [selected, setSelected] = useState(null); // store full object

  
  const totalPages = Math.ceil(data.length / pageSize);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = data.slice(start, end);

  const select = (obj) => {
    setSelected(obj);
    close(true);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Created By</th>
            <th  style={{paddingLeft:"20px"}}>Template Name</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {pageItems.map((obj, idx) => (
            <tr key={idx}>
              <td style={{fontStyle:"italic"}}>{obj.created_by}</td>
              <td style={{paddingLeft:"20px"}}>{obj.template_name}</td>
              <td>
                <button  style={{marginLeft:"20px"}} onClick={() => select(obj)}>
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div style={{ marginTop: "0.75rem" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span style={{ margin: "0 1rem" }}>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}


export default PaginatedTable;