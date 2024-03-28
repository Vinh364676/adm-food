import TableComponent from "../../tableComponent/TableComponent";
import {
  EllipsisOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import productImg from "../../../assets/images/product/product.svg";
import productImg1 from "../../../assets/images/product/product1.jpg";
import deleteIcon from "../../../assets/images/product/deleteIcon.svg";
import { Dropdown, Input, Menu, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/url-config";
import { dispatch, useSelector } from "../../../redux/store";

import moment from "moment";
import {
  deleteProduct,
  getProduct,
  getProductPage,
} from "../../../redux/slices/product";
import { getCategory } from "../../../redux/slices/category";
import axios from "axios";
import { write } from "xlsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { deleteMultiple, deleteSupplier, getSupplier } from "../../../redux/slices/supplier";
import { getReceipt } from "../../../redux/slices/receipt";
const { Item, Divider } = Menu;
const SupplierTable = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { supplierList, supplierCount } = useSelector(
    (state) => state.supplier
  );
  const {receiptList} = useSelector(state => state.receipt)

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  console.log("uploadedFile-prodct", uploadedFile);

  useEffect(() => {
    dispatch(
      getSupplier({
        PageNumber: 1,
        PageSize: 10,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      getReceipt({
        PageNumber: 1,
        PageSize: 10,
      })
    );
  }, []);
  //xu ly
  // modal
  const showModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedId !== null) {
      try {
        const hasProducts = receiptList.some(receipt => receipt.supplierId === selectedId);
        if (hasProducts) {
          // Hiển thị thông báo lỗi
          showError();
        } else {
          // Nếu không có sản phẩm liên quan, thực hiện xóa brand như bình thường.
          await dispatch(deleteSupplier(selectedId));
          setSelectedId(null);
          setIsModalOpen(false);
          showNotification();
        }
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //thong bao
  const showNotification = () => {
    notification.success({
      className: "notification__item",
      message: "Xóa thành công",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };
  const showError = () => {
    notification.error({
      className: "notification__item notification__item--error",
      message: "Nhà cung cấp đang tồn tại trong hóa đơn, không thể xóa được!",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
    setIsModalOpen(false);
  };
  const showNotificationExport = () => {
    notification.success({
      className: "notification__item",

      message: "Xuất file Excel thành công",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };
  const showNotificationImport = () => {
    notification.success({
      className: "notification__item",

      message: "Nhập file Excel thành công",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };
  // xu ly thay doi page
  const onChangePage = (pageIndex: any, pageSize: any) => {
    dispatch(getSupplier({ PageNumber: pageIndex, PageSize: pageSize }));
  };
  // xu ly xoa nhieu san pham
  const onDeleteSelected = async (selectedItem: number[]) => {
    const selectedIds: number[] = [];

    
    for (const item of dataForTable) {
      if (selectedItem.includes(item.key)) {
        selectedIds.push(item.id);
      }
    }
  
    try {
      if (selectedIds.length > 0) {
        // Kiểm tra xem có sản phẩm thuộc các brand cần xóa không
        const hasProducts = receiptList.some(receipt => selectedIds.includes(receipt.supplierId));
        console.log('====================================');
        console.log("hasProducts",hasProducts);
        console.log('====================================');
        if (hasProducts) {
          // Hiển thị thông báo lỗi
          showError();
        } else {
          // Nếu không có sản phẩm nào thuộc các brand, thì thực hiện xóa
          await dispatch(deleteMultiple(selectedIds));
          showNotification();
        }
      }
    } catch (error) {
      // Xử lý lỗi ở đây nếu cần thiết
    }
  };
 
 
  // export excel
  const ExportExcel = () => {
    axios
      .get("https://localhost:7199/api/Product/ExportExcel", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "Products.xlsx");
        showNotificationExport();
      })
      .catch((error) => {
        console.error("Error when calling API to export Excel:", error);
      });
  };
  // import excel
  const importExcel = (file: any) => {
    setUploadedFile(file); // Lưu file đã tải lên vào state

    if (file) {
      // Kiểm tra xem file có tồn tại
      const formData = new FormData();
      formData.append("file", file);

      console.log("formData", formData);

      // Make a POST request to the API endpoint
      axios
        .post("https://localhost:7199/api/Product/ImportExcel", formData)
        .then((response) => {
          // Handle the response from the API if needed
          showNotificationImport();
          console.log("File uploaded successfully", response);
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Thời gian chờ 3 giây (3000 milliseconds
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
          console.error("Error uploading file", error);
        });
    }
  };

  const dataForTable = supplierList.map((supplier, index) => {
    return {
      key: index,
      id: supplier.id,
      name: supplier.name,
      address: supplier.address,
      phoneNumber: supplier.phoneNumber,
      email: supplier.email,
    };
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "name",
      width: 300,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 150,
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <span className="table__action">
          <Dropdown
            placement="bottomRight"
            menu={{
              items: [
                {
                  label: "Xóa",
                  key: "0",
                  icon: <DeleteOutlined />,
                  className: "drop--delete",
                  onClick: () => showModal(record.id),
                },
                {
                  label: (
                    <Link to={ROUTE_PATHS.EditSupplier.replace(":id", record.id.toString())}>
                      Sửa
                    </Link>
                  ),
                  key: "1",
                  icon: <EditOutlined />,
                },
              ],
            }}
            className="table__action__dropdown"
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        </span>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <TableComponent
        columns={columns}
        data={dataForTable}
        placeholder="Tìm kiếm nhà cung cấp"
        totalPage={supplierCount}
        onDeleteCheckBox={onDeleteSelected}
        onChangePage={onChangePage}
        exportOnClick={ExportExcel}
        importOnClick={importExcel}
      />
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
          <h2 className="modal__product__content--title">Xóa nhà cung cấp</h2>
          <p className="modal__product__content--desc">
            Bạn có chắc chắn muốn xóa nhà cung cấp này không?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default SupplierTable;
