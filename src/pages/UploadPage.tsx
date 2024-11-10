import React, { useState } from "react";
import UploadResults from "../components/UploadResults";
import { uploadCSV } from "../utils/api";
import { UploadResponse } from "../types/upload";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<
    UploadResponse["data"] | null
  >(null);

  // Función para manejar el cambio de archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  // Función para manejar la carga del archivo
  const handleUpload = async () => {
    if (!file) return;
    const response = await uploadCSV(file);
    setUploadResult(response.data);
  };

  // Función para manejar la corrección de errores
  const handleRetry = (row: number, updatedData: Partial<any>) => {
    if (!uploadResult) return;

    const newSuccess = [...uploadResult.success];
    const newErrors = [...uploadResult.errors];

    // Encontrar el error que se está corrigiendo usando el índice de fila
    const errorIndex = newErrors.findIndex((error) => error.row === row);
    if (errorIndex !== -1) {
      const errorRecord = newErrors[errorIndex];

      // Simular corrección de datos
      const correctedRecord = {
        id: errorRecord.row,
        name: updatedData["name"] || "",
        email: updatedData["email"] || "",
        age: updatedData["age"] || 0,
      };

      // Mover el registro corregido a la lista de registros exitosos
      newSuccess.push(correctedRecord);

      // Eliminar el error corregido de los errores
      newErrors.splice(errorIndex, 1);

      // Actualizar el estado con los nuevos resultados
      setUploadResult({
        success: newSuccess,
        errors: newErrors,
      });
    }
  };

  // Función para resetear la página
  const handleReset = () => {
    setFile(null);
    setUploadResult(null);
  };

  return (
    <div className="p-4 flex flex-col gap-3 bg-red-100 rounded-xl max-w-2xl w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload CSV</h2>
      {!uploadResult ? (
        <>
          <input type="file" onChange={handleFileChange} />
          <button
            className={`px-4 py-2 font-bold text-white rounded ${
              file
                ? "bg-gray-400 hover:bg-red-950"
                : "bg-gray-200 cursor-not-allowed"
            }`}
            onClick={handleUpload}
            disabled={!file}
          >
            Upload File
          </button>
        </>
      ) : (
        <UploadResults
          data={uploadResult}
          onRetry={handleRetry}
          onReset={handleReset}
        />
      )}
    </div>
  );
};

export default UploadPage;
