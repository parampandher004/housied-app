import React from "react";
import PropTypes from "prop-types";

const DataTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-black-background">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.name}
                className="py-2 px-4 border-b border-base-200 dark:border-base-400 text-left text-sm font-semibold text-black-foreground dark:text-white-foreground"
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-base-100 dark:hover:bg-base-200"
            >
              {columns.map((column) => (
                <td
                  key={column.name}
                  className="py-2 px-4 border-b border-base-200 dark:border-base-400 text-sm text-black-foreground dark:text-white-foreground"
                >
                  {typeof column.selector === "function"
                    ? column.selector(row)
                    : row[column.selector]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      selector: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      cell: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTable;
