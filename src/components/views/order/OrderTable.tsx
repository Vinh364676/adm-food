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
import { Dropdown, Input, Menu, Modal, Select, notification } from "antd";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/url-config";
import { dispatch, useSelector } from "../../../redux/store";
import { deleteBrand, getBrand } from "../../../redux/slices/brand";
import moment from "moment";
import "./OrderTable.scss";
import {
  deleteMultiple,
  deleteProduct,
  getProduct,
  getProductPage,
} from "../../../redux/slices/product";
import { getCategory } from "../../../redux/slices/category";
import axios from "axios";
import { write } from "xlsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { deleteSupplier, getSupplier } from "../../../redux/slices/supplier";
import { getHistory, updateHistory } from "../../../redux/slices/history";
import { getHistoryDetail } from "../../../redux/slices/historyDetail";
const { Item, Divider } = Menu;

const OrderTable = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { historyList, historyCount } = useSelector((state) => state.history);
  console.log("====================================");
  console.log("historyList", historyList);
  console.log("====================================");
  const { historyDetailList } = useSelector((state) => state.historyDetail);
  const { productList } = useSelector((state) => state.product);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  console.log("uploadedFile-prodct", uploadedFile);
  const [selectedStatus, setSelectedStatus] = useState(null);
  useEffect(() => {
    dispatch(getHistory({ PageNumber: 1, PageSize: 10 }));
    dispatch(getHistoryDetail({ PageNumber: 1, PageSize: 100 }));
    dispatch(getProduct({ PageNumber: 1, PageSize: 100 }));
  }, []);
  //xu ly
  // modal
  const showModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
   console.log('====================================');
   console.log("key",id);
   console.log('====================================');
  };
  const handleSelectChange = (value:any) => {
    // Xử lý sự kiện khi giá trị của Select thay đổi
    setSelectedStatus(value);
  };
  
  const handleOk = async () => {
    if (selectedStatus !== null && selectedId !== null) {
      // Tìm mục trong orderHistory có ID trùng khớp với selectedId
      const selectedItem = orderHistory.find((item) => item.id === selectedId);

      if (selectedItem) {
        // Chuẩn bị dữ liệu cần gửi đến API cho mục được chọn
        const dataToSend = {
          id: selectedItem.id,
          deliverAddress: selectedItem.address,
          createDate: moment(selectedItem.date, 'DD-MM-YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
          totalPrice: 0,
          userId: selectedItem.userId,
          voucherId: selectedItem.voucherId,
          orderStatus: selectedStatus,
          note: '',
        };
  
        try {
          // Gửi dữ liệu đến API
          await dispatch(updateHistory(dataToSend));
          // Sau khi API thành công, bạn có thể thực hiện các bước tiếp theo nếu cần
          console.log('Data sent to API successfully');
          setIsModalOpen(false);
          showNotification();
        } catch (error) {
          console.error('Error updating history:', error);
        }
      } else {
        console.error(`Item with ID ${selectedId} not found in orderHistory`);
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
      message: "Cập nhật thành công",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
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
    dispatch(getHistory({ PageNumber: pageIndex, PageSize: pageSize }));
  };
  // xu ly xoa nhieu san pham
  const onDeleteSelectedProducts = async (selectedProductIds: number[]) => {
    // const selectedIds = [];
    // for (const product of dataForTable) {
    //   if (selectedProductIds.includes(product.key)) {
    //     selectedIds.push(product.id);
    //   }
    // }
    // try {
    //   if (selectedIds.length > 0) {
    //     await dispatch(deleteMultiple(selectedIds));
    //     showNotification();
    //   }
    // } catch (error) {
    //   // Xử lý lỗi ở đây nếu cần thiết
    // }
  };

  // export excel
  const ExportExcel = () => {
    axios
      .get("https://localhost:7199/api/OrderAdmin/ExportExcel", {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "Orders.xlsx");
        showNotificationExport();
      })
      .catch((error) => {
        console.error("Error when calling API to export Excel:", error);
      });
  };
  // import excel
  const importExcel = (file: any) => {
    // setUploadedFile(file); // Lưu file đã tải lên vào state
    // if (file) {
    //   // Kiểm tra xem file có tồn tại
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   console.log("formData", formData);
    //   // Make a POST request to the API endpoint
    //   axios
    //     .post("https://localhost:7199/api/Product/ImportExcel", formData)
    //     .then((response) => {
    //       // Handle the response from the API if needed
    //       showNotificationImport();
    //       console.log("File uploaded successfully", response);
    //       setTimeout(() => {
    //         window.location.reload();
    //       }, 3000); // Thời gian chờ 3 giây (3000 milliseconds
    //     })
    //     .catch((error) => {
    //       // Handle any errors that occur during the API request
    //       console.error("Error uploading file", error);
    //     });
    // }
  };

  const orderHistory = historyList.map((historyItem) => {
    const formattedTotal = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(historyItem.totalPrice);

    // Filter historyDetailList to get details for the current historyItem
    const historyDetailsForItem = historyDetailList.filter(
      (detail) => detail.billId === historyItem.id
    );

    const productDetails = historyDetailsForItem.map((detail) => {
      const product = productList.find(
        (product) => product.id === detail.productId
      );
      const productName = product ? product.productName : "Unknown Product";
      return {
        productName: productName,
        quantity: detail.quantity,
        price: detail.unitPrice,
      };
    });
    // Extract product names, quantities, and prices from productDetails
    const productNames = productDetails.map((product) => product.productName);
    const quantities = productDetails.map((product) => product.quantity);
    const prices = productDetails.map((product) => product.price);

    return {
      id: historyItem.id,
      voucherId: historyItem.voucherId,
      address: historyItem.deliverAddress,
      userId: historyItem.userId,
      idProduct: historyDetailsForItem.map((detail) => detail.productId),
      date: moment(historyItem.createDate).format("DD/MM/YYYY"),
      total: formattedTotal,
      status: historyItem.orderStatus,
      quantity: quantities,
      prices: prices,

      name: productNames.join(", "), // Concatenate product names
    };
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Mã Khách hàng",
      dataIndex: "userId",
      width: 300,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 150,
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "prices",
      width: 150,
    },
    {
      title: "Khuyến mãi",
      dataIndex: "voucherId",
      width: 150,
    },
    {
      title: "Tổng cộng",
      dataIndex: "total",
      width: 150,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
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
                  label: "Xem",
                  key: "0",
                  icon: <DeleteOutlined />,
                  // className: "drop--delete",
                  onClick: () => showModal(record.id),
                },
                // {
                //   label: (
                //     <Link to={ROUTE_PATHS.EditSupplier.replace(":id", record.id.toString())}>
                //       Sửa
                //     </Link>
                //   ),
                //   key: "1",
                //   icon: <EditOutlined />,
                // },
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
        data={orderHistory}
        placeholder="Tìm kiếm đơn hàng"
        totalPage={historyCount}
        onDeleteCheckBox={onDeleteSelectedProducts}
        onChangePage={onChangePage}
        exportOnClick={ExportExcel}
        importOnClick={importExcel}
        isPrimary={false}
      />
      <Modal
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="modal__product"
        okType={"danger"}
      >
        <div className="modal__product__content">
          <h2 className="modal__product__content--title">
            Thay đổi trạng thái
          </h2>

          <Select
            placeholder="Trạng thái"
            className="select__order"
            onChange={handleSelectChange}
          value={selectedStatus}
          >
            <Select.Option value="Đang xử lý">Đang xử lý</Select.Option>
            <Select.Option value="Đã gửi hàng">Đã gửi hàng</Select.Option>
            <Select.Option value="Đã giao hàng">Đã giao hàng</Select.Option>
          </Select>
        </div>
      </Modal>
    </>
  );
};

export default OrderTable;
