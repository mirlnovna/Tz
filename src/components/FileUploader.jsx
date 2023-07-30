import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const MAX_FILES = 100;

const FileUploader = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > MAX_FILES) {
      alert("Максимальное количество файлов для загрузки - 100");
      return;
    }

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(
        "https://cloud-api.yandex.net/v1/disk/resources/upload",
        formData,
        {
          headers: {
            Authorization:
              "Bearer 8fa08401-3cd9-47a1-813f-dcb2a0a04f98",
          },
        }
      );

      console.log("Загрузка успешна!", response.data);
    } catch (error) {
      console.error("Ошибка загрузки файла", error);
    }
  }, []);   

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*", 
    multiple: true, 
    // maxSize: 10 * 1024 * 1024, // Максимальный размер файла (в данном примере - 10 МБ)
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""}`}
    >
      <input {...getInputProps()} />
      <p>Перетащите сюда файлы или кликните, чтобы выбрать</p>
    </div>
  );
};

export default FileUploader;
