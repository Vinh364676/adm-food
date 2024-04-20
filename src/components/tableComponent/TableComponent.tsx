import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Pagination,
  Popover,
  Row,
  Select,
  Table,
  Upload,
  notification,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  DownloadOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  UploadOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined
} from "@ant-design/icons";
import "./TableComponent.scss";
import ButtonCustom from "../button-custom/ButtonCustom";
import deleteIcon from "../../assets/images/product/deleteIcon.svg";
import CustomPagination from "../pagination-custom/PaginationCustom";
import axios from "axios";
import { write } from "xlsx";
type Prop = {
  columns: any;
  data: any;
  placeholder: string;
  totalPage?: number;
  onDeleteCheckBox: (selectedID: number[]) => void;
  onChangePage: (pageIndex: number, pageSize: number) => void;
  importOnClick?: (file: any) => void;
  exportOnClick?: () => void;
  isPrimary?: boolean;
};

const TableComponent = ({
  columns,
  data,
  placeholder,
  totalPage,
  // onProductSelect,
  onDeleteCheckBox,
  // onDeleteSelectedProducts,
  onChangePage,
  importOnClick,
  exportOnClick,
  isPrimary = true
}: Prop) => {
  // khoi tao state
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSelect, setIsModalSelect] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState('');
  const [customPageSizeInput, setCustomPageSizeInput] = useState("");
  const [fileExcel, setFileExcel] = useState<any | null>(null);
  console.log("====================================");
  console.log("fileExcel-table", fileExcel);
  console.log("====================================");
  //khoi tao bien hasSelected, neu selectedRowKeys> 0 thi hien thi so item duoc chon
  const hasSelected = selectedRowKeys.length > 0;
  const [params, setParams] = useState({
    pageSize: 10,
    pageIndex: 1,
  });

  //loading
  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  // ham xu ly

  /////////////////////////////////////
  // search data
  const handleSearch = (e: any) => {
    const { value } = e.target;
    setSearchText(value); // luu du lieu vao state
  };
  const handleSort = (option: string) => {
    setSortOption(option);
  };
  // Lọc dữ liệu dựa trên giá trị state `searchText` và lưu kết quả vào `filteredData`.
  let filteredData = data.filter(
    (item: any) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.id.toString().includes(searchText.toLowerCase())
  );
  if (sortOption === 'A-Z') {
    filteredData = filteredData.sort((a:any, b:any) => a.name.localeCompare(b.name));
  } else if (sortOption === 'Z-A') {
    filteredData = filteredData.sort((a:any, b:any) => b.name.localeCompare(a.name));
  } 
  /////////////////////////////////////
  //thong bao
  const showNotification = () => {
    notification.error({
      className: "notification__item notification__item--error",
      message: "Số Item vượt quá tổng số",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };
  const showNotificationError = () => {
    notification.error({
      className: "notification__item notification__item--error",
      message: "Vui lòng nhập số item",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };
  //////////////////////////////////////
  //xu ly modal
  const showModal = () => {
    setIsModalOpen(true);
    console.log();
  };

  const handleOk = async () => {
    start();
    // xu ly xoa data
    onDeleteCheckBox(selectedRowKeys);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalSelect = () => {
    setIsModalSelect(true);
  };

  const handleOkSelect = () => {
    if (customPageSizeInput === "") {
      // Nếu không nhập gì vào input, yêu cầu người dùng nhập
      showNotificationError();
      return;
    }
    const newPageSize = parseInt(customPageSizeInput);
    if (!isNaN(newPageSize)) {
      let updatedPageSize = newPageSize;

      // Kiểm tra xem totalPage có tồn tại trước khi sử dụng nó
      if (typeof totalPage !== "undefined" && newPageSize > totalPage) {
        // Nếu newPageSize lớn hơn totalPage, thì cập nhật pageSize bằng totalPage
        updatedPageSize = totalPage;
        showNotification();
      }

      setParams({
        ...params,
        pageSize: updatedPageSize,
      });

      onChangePage(params.pageIndex, updatedPageSize);
    }
    setIsModalSelect(false);
  };

  const handleCancelSelect = () => {
    setIsModalSelect(false);
  };

  /////////////////////////////////////
  //
  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSearchText("");
  };

  // Xu ly dong duoc chon
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange, //xu ly dong duoc chon
  };

  // xu ly thay doi page
  const handlePageChange = (pageIndex: any, pageSize: any) => {
    // Update the current page only
    setParams({
      ...params,
      pageIndex,
    });
    onChangePage(pageIndex, params.pageSize); // Sử dụng params.pageSize thay vì pageSize
  };

  const handleSelectChange = (value: any) => {
    if (value === "openModal") {
      showModalSelect(); // Hiển thị Modal để nhập số item
    } else {
      setParams({
        ...params,
        pageSize: value,
      });
      onChangePage(params.pageIndex, value);
    }
  };

  const handleCustomPageSizeInputChange = (e: any) => {
    const { value } = e.target;
    setCustomPageSizeInput(value);
  };

  const content = (
    <div className="contentFilter">
      <p onClick={() => handleSort('A-Z')}><SortAscendingOutlined /> A - Z</p>
      <p onClick={() => handleSort('Z-A')}><SortDescendingOutlined /> Z - A</p>
    </div>
  );

  return (
    <div className="table">
      <Card className="table__card">
        <Row className="table__header">
          <div>
            <Input
              className="table__header__search"
              allowClear={true}
              placeholder={placeholder}
              prefix={<SearchOutlined />}
              bordered={false}
              onChange={handleSearch}
            />
          </div>
          <div className="table__header__right">
            <div className="table__header__right--button">
              {hasSelected ? (
                <Button
                  danger={true}
                  onClick={showModal}
                  loading={loading}
                  className="button__item"
                >
                  <DeleteOutlined /> Delete
                </Button>
              ) : null}
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `${selectedRowKeys.length} Selected` : ""}
              </span>
            </div>
            
              {!isPrimary?<Upload
              accept=".xls, .xlsx"
              maxCount={1}
              beforeUpload={() => false}
              fileList={fileExcel}
              onChange={(file) => {
                setFileExcel(file.file);
                if (importOnClick) {
                  importOnClick(file.file);
                }
              }}
            >
              <ButtonCustom icon={<UploadOutlined />} title="Import" />
            </Upload> :null}
            {!isPrimary?
            <ButtonCustom
            onClick={exportOnClick}
            icon={<DownloadOutlined />}
            title="Export"
          />
            :null}
            
            <div className="popoverFilter">
            <Popover content={content} trigger="click"  placement="bottomRight">
              <Button icon={<FilterOutlined />} className="buttonCustom">
                Filter
              </Button>
            </Popover>
            </div>
            
          </div>
        </Row>
        <Table
          className="table__table"
          rowSelection={rowSelection} //chon cac dong
          columns={columns}
          dataSource={filteredData}
          pagination={false}
        
          scroll={{
            x: 1000
          }}
        />
        <div className="table__footer">
          <div className="table__footer__col">
            <p className="table__footer__col__title">Số hàng mỗi trang</p>
            <Select
              className="table__footer__select"
              style={{ width: 58 }}
              value={params.pageSize}
              onChange={handleSelectChange}
              bordered={false}
              suffixIcon={null}
            >
              <Select.Option value={5}>5</Select.Option>
              <Select.Option value={10}>10</Select.Option>
              <Select.Option value={15}>15</Select.Option>
              <Select.Option value={20}>20</Select.Option>
              <Select.Option value="openModal">Nhập</Select.Option>
            </Select>
          </div>

          <CustomPagination
            current={params.pageIndex}
            total={totalPage}
            pageSize={params.pageSize}
            onChange={handlePageChange}
          />
        </div>
      </Card>

      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal__product"
        okType={"danger"}
      >
        <img src={deleteIcon} alt="" className="modal__product__icon" />
        <div className="modal__product__content">
          <h2 className="modal__product__content--title">Xóa nhiều dữ liệu</h2>
          <p className="modal__product__content--desc">
            Bạn có chắc chắn muốn xóa các dữ liệu này không?
          </p>
        </div>
      </Modal>

      <Modal
        centered
        open={isModalSelect}
        onOk={handleOkSelect}
        onCancel={handleCancelSelect}
        className="modal__product modal__selectPagination"
        okType={"danger"}
      >
        <Form
          name="basic"
          requiredMark={"optional"}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Số item trên trang"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số!",
              },
              {
                validator: (_, value) => {
                  const numberValue = parseInt(value, 10);

                  if (isNaN(numberValue) || numberValue <= 0) {
                    return Promise.reject("Vui lòng nhập số lớn hơn 0");
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              className="modal__selectPagination__input"
              placeholder="Số item"
              value={customPageSizeInput}
              onChange={handleCustomPageSizeInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TableComponent;
