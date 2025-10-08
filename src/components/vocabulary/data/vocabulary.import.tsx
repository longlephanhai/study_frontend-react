import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Table, Upload } from "antd"
import { useState } from "react";
import * as XLSX from 'xlsx';
import { callApiCreateMultipleVocabularies } from "../../../services/api";

interface IProps {
  isModalOpenImportVocabulary: boolean;
  setIsModalOpenImportVocabulary: (isModalOpen: boolean) => void;
  topicsId: string;
}
const { Dragger } = Upload;
const ImportVocabulary = (props: IProps) => {

  const { isModalOpenImportVocabulary, setIsModalOpenImportVocabulary, topicsId } = props;

  const [dataExcel, setDataExcel] = useState<IVocabulary[]>([]);

  // const [rows, setRows] = useState(3);
  // const [expanded, setExpanded] = useState(false);

  // https://stackoverflow.com/questions/51514757/action-function-is-required-with-antd-upload-control-but-i-dont-need-it
  const dummyRequest = ({
    file,
    onSuccess,
  }: {
    file: File;
    onSuccess: (response: string) => void;
  }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const propsUpload = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv

    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    customRequest: dummyRequest,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (e) {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            // const json = XLSX.utils.sheet_to_json(sheet);
            const json = XLSX.utils.sheet_to_json(sheet, {
              header: ["vocab", "meaning", "example", "level", "pronounce", "img"],
              range: 1 //skip header row
            });
            if (json && json.length > 0) setDataExcel(json as IVocabulary[]);
          }
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: React.DragEvent<HTMLDivElement>) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleSubmit = async () => {
    try {
      const response = await callApiCreateMultipleVocabularies(topicsId, dataExcel);
      if (response.statusCode === 201) {
        message.success("Import writing successfully");
        setIsModalOpenImportVocabulary(false);
        setDataExcel([]);
      } else {
        message.error(response.message || "Import writing failed");
        setIsModalOpenImportVocabulary(false);
        setDataExcel([]);
      }
    } catch (error) {
      // @ts-ignore
      message.error(error.message || "Import question failed");
      setIsModalOpenImportVocabulary(false);
      setDataExcel([]);
    }
  }
  return (
    <Modal
      title="Import data question"
      width={"70vw"}
      open={isModalOpenImportVocabulary}
      onOk={() => handleSubmit()}
      onCancel={() => {
        setIsModalOpenImportVocabulary(false);
        setDataExcel([]);
      }}
      okText="Import data"
      okButtonProps={{
        disabled: dataExcel.length < 1
      }}
      maskClosable={false}
    >
      <Dragger
        {...propsUpload}
        showUploadList={dataExcel.length > 0}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single upload. Only accept .csv, .xls, .xlsx . or
          &nbsp;  <a onClick={e => e.stopPropagation()}
            //  href={templateFile} 
            download>Download Sample File</a>
        </p>
      </Dragger>

      <div style={{ paddingTop: 20 }}>
        <Table<IVocabulary>
          dataSource={dataExcel}
          key={"_id"}
          title={() => <span>Dữ liệu upload:</span>}
          columns={[
            { dataIndex: 'vocab', key: 'vocab', title: 'Vocabulary' },
            { dataIndex: 'meaning', key: 'meaning', title: 'Meaning' },
            { dataIndex: 'example', key: 'example', title: 'Example' },
            { dataIndex: 'level', key: 'level', title: 'Level' },
            { dataIndex: 'pronounce', key: 'pronounce', title: 'Pronunciation' },
            { dataIndex: 'img', key: 'img', title: 'Image' },
          ]}
        />
      </div>
    </Modal>
  )
}

export default ImportVocabulary;