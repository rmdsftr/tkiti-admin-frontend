import React, { useMemo, useState } from "react";
import Pagination from "./pagination";
import "../styles/DataTable.css";

export type SpecialColumnKey = "action" | "image" | "status";
export type ColumnKey<T> = keyof T | SpecialColumnKey;

export interface Column<T> {
  key: ColumnKey<T>;
  label: string;
  sortable?: boolean;
  className?: string;
  
  render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  initialPage?: number;
  onAction?: (item: T) => void;
  className?: string;
}

const toDisplayString = (v: unknown) => {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
};

interface SortConfig<T> {
  key: keyof T | null;
  direction: "asc" | "desc";
}

function DataTable<T extends { id?: string | number; name?: string }>(props: DataTableProps<T>) {
  const {
    data,
    columns,
    itemsPerPage = 10,
    initialPage = 1,
    onAction,
    className,
  } = props;

  const [currentPage, setCurrentPage] = useState<number>(Math.max(1, initialPage));
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({ key: null, direction: "asc" });

  const sortedData = useMemo(() => {
    const arr = [...data];
    const key = sortConfig.key as keyof T | null;

    if (!key) return arr;

    arr.sort((a, b) => {
      const va = a[key];
      const vb = b[key];

      if (va === undefined || va === null) {
        return vb === undefined || vb === null ? 0 : -1;
      }
      if (vb === undefined || vb === null) return 1;

      if (typeof va === "number" && typeof vb === "number") {
        return sortConfig.direction === "asc" ? va - vb : vb - va;
      }

      if (va instanceof Date && vb instanceof Date) {
        return sortConfig.direction === "asc" ? va.getTime() - vb.getTime() : vb.getTime() - va.getTime();
      }

      const sa = toDisplayString(va).toLowerCase();
      const sb = toDisplayString(vb).toLowerCase();
      if (sa < sb) return sortConfig.direction === "asc" ? -1 : 1;
      if (sa > sb) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return arr;
  }, [data, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));
  
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (col: Column<T>) => {
    const maybeKey = col.key;
    if (!col.sortable) return;

    if (maybeKey === "action" || maybeKey === "image" || maybeKey === "status") return;

    setSortConfig(prev => {
      const key = maybeKey as unknown as keyof T;
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const getStatusClass = (status: string) => {
    const statusMap: Record<string, string> = {
      Active: "status-active",
      Pending: "status-pending",
      Inactive: "status-inactive",
      "On Sale": "status-onsale",
      Bouncing: "status-bouncing",
      Admin: "status-admin",
      Member: "status-member",
    };
    return statusMap[status] || "";
  };

  const renderCell = (col: Column<T>, row: T): React.ReactNode => {
    if (col.render) {
      return col.render((row as any)[col.key as keyof T], row);
    }

    if (col.key === "image") {
      const src = (row as any)[col.key as keyof T] as string | undefined;
      return (
        <div className="product-cell" aria-label="product-cell">
          {src ? (
            <img src={src} alt={(row as any).name ?? "image"} className="product-image" />
          ) : (
            <div className="product-image product-image--placeholder" />
          )}
          <span>{toDisplayString((row as any).name)}</span>
        </div>
      );
    }

    if (col.key === "status") {
      const status = toDisplayString((row as any)[col.key as keyof T]);
      return <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>;
    }

    if (col.key === "action") {
      return (
        <button
          className="action-button"
          onClick={() => onAction && onAction(row)}
          aria-label="row-actions"
        >
          ⋯
        </button>
      );
    }

    const val = (row as any)[col.key as keyof T];
    return toDisplayString(val);
  };

  return (
    <div className={`data-table-container ${className ?? ""}`}>
      <div className="table-wrapper">
        <table className="data-table" role="table">
          <thead>
            <tr>
              {columns.map((col) => {
                const isSortable = !!col.sortable && col.key !== "action" && col.key !== "image" && col.key !== "status";
                const sortActive = sortConfig.key !== null && String(sortConfig.key) === String(col.key);
                return (
                  <th
                    key={String(col.key)}
                    onClick={() => isSortable && handleSort(col)}
                    className={isSortable ? "sortable" : undefined}
                    aria-sort={sortActive ? (sortConfig.direction === "asc" ? "ascending" : "descending") : "none"}
                    role="columnheader"
                  >
                    {col.label}
                    {isSortable && sortActive && <span className="sort-icon">{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={(row.id ?? rowIndex) as React.Key}>
                {columns.map((col) => (
                  <td key={String(col.key)} className={col.className ?? undefined}>
                    {renderCell(col, row)}
                  </td>
                ))}
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center", padding: "1rem" }}>
                  No data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default DataTable;