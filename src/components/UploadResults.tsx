import React, { useState } from "react";
import { UploadResponse, ErrorDetail } from "../types/upload";

// Expresión regular para validar el email
const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email && emailRegex.test(email);
};

// Validar si la edad es un número positivo
const isValidAge = (age: string) => {
  const ageNumber = parseInt(age, 10);
  return !isNaN(ageNumber) && ageNumber > 0;
};

interface UploadResultsProps {
  data: UploadResponse["data"];
  onRetry: (row: number, updatedData: Partial<ErrorDetail["details"]>) => void;
  onReset: () => void;
}

const UploadResults: React.FC<UploadResultsProps> = ({
  data,
  onRetry,
  onReset,
}) => {
  const [editData, setEditData] = useState<
    Record<number, ErrorDetail["details"]>
  >({});

  const handleEditChange = (row: number, field: string, value: string) => {
    setEditData({
      ...editData,
      [row]: { ...editData[row], [field]: value },
    });
  };

  // Validar si todos los campos están completos y el correo tiene el formato adecuado
  const isFormValid = (row: number) => {
    const fields = editData[row];
    if (!fields) return false;
    const allFieldsFilled = Object.values(fields).every(
      (value) => value.trim() !== ""
    );
    const isEmailValid = isValidEmail(fields["email"] || "");
    const isAgeValid = isValidAge(fields["age"] || "");
    return allFieldsFilled && isEmailValid && isAgeValid;
  };

  // Simular corrección de errores
  const handleRetry = (
    row: number,
    updatedData: Partial<ErrorDetail["details"]>
  ) => {
    onRetry(row, updatedData);
  };

  return (
    <div className="p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Upload Results</h2>
      <div className="bg-green-100 p-3 mb-4 rounded">
        <h3 className="text-lg font-semibold">Successful Records:</h3>
        {data.success.map((record) => (
          <div key={record.id}>
            {record.name} - {record.email}
          </div>
        ))}
      </div>

      <div className="bg-red-100 p-3 mb-4 rounded flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Errors:</h3>
        {data.errors.map((error) => (
          <div key={error.row} className="mb-2 flex flex-col gap-2">
            <div>Row {error.row}</div>
            {Object.entries(error.details).map(([field, message]) => (
              <div key={field} className="flex items-center gap-2">
                <label className="text-base">{field}:</label>
                <input
                  className="border p-1 rounded w-[70%]"
                  type="text"
                  value={editData[error.row]?.[field] || ""}
                  placeholder={message}
                  onChange={(e) =>
                    handleEditChange(error.row, field, e.target.value)
                  }
                />
              </div>
            ))}
            {editData[error.row]?.["email"] &&
              !isValidEmail(editData[error.row]?.["email"]) && (
                <div className="text-red-500 text-sm mt-1">
                  Invalid email format
                </div>
              )}
            {editData[error.row]?.["age"] &&
              !isValidAge(editData[error.row]?.["age"]) && (
                <div className="text-red-500 text-sm mt-1">
                  Age must be a positive number
                </div>
              )}
            <button
              className={`px-4 py-2 font-bold text-white rounded ${
                isFormValid(error.row)
                  ? "bg-gray-400 hover:bg-red-950"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleRetry(error.row, editData[error.row])}
              disabled={!isFormValid(error.row)}
            >
              Retry
            </button>
          </div>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-red-950 w-1/3 mx-auto"
        onClick={onReset}
      >
        New File
      </button>
    </div>
  );
};

export default UploadResults;
