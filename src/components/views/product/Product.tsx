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
import { deleteBrand, getBrand } from "../../../redux/slices/brand";
import "./Product.scss";
import moment from "moment";
import {
  deleteMultiple,
  deleteProduct,
  getProduct,
  getProductPage,
} from "../../../redux/slices/product";
import { getCategory } from "../../../redux/slices/category";
import axios from "axios";
import { write } from "xlsx";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getReceipt, getReceiptDetail } from "../../../redux/slices/receipt";
const { Item, Divider } = Menu;
const ProductTable = () => {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { productList, productCount } = useSelector((state) => state.product);
  console.log('====================================');
  console.log("productList",productList);
  console.log('====================================');
  const { categoryList } = useSelector((state) => state.category);
  const { brandList } = useSelector((state) => state.brand);
  const { receiptList,receiptDetail } = useSelector((state) => state.receipt);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  console.log("uploadedFile-prodct",uploadedFile)
  useEffect(() => {
    dispatch(
      getCategory({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getBrand({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      getProduct({
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
  useEffect(() => {
    dispatch(
      getReceiptDetail({
        PageNumber: 1,
        PageSize: 10,
      })
    );
  }, []);
  //xu ly
  // modal
  const showModal = (id: number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
    console.log(id);
  };
  const combinedData = receiptList.map(receipt => {
    const details = Array.isArray(receiptDetail)
      ? receiptDetail.filter(detail => detail.receiptId === receipt.id)
      : [];
    return { ...receipt, receiptDetails: details };
  });
  
  const dataForTableList = combinedData.map((receipt, index) => {
    const productDetails = receipt.receiptDetails.map((detail) => {
      const product = productList.find((product) => product.id === detail.productId);
      const productName = product ? product.productName : "Unknown Product";
      return {
        id: detail.productId,
        productName: productName,
        quantity: detail.quantity,
        price: detail.price,
      };
    });
    return productDetails; // Return the product details
  });
  
  const handleOk = async () => {
    if (selectedProductId !== null) {
      if (dataForTableList) {
        const allProductIds = dataForTableList
          .flat()
          .map((product) => product.id);
  
        console.log('====================================');
        console.log("allProductIds", allProductIds);
        console.log('====================================');
  
        // Check if selectedProductId is NOT in the array of all product ids
        if (!allProductIds.includes(selectedProductId)) {
          try {
            // Dispatch action to delete product
            await dispatch(deleteProduct(selectedProductId));
  
            // If the dispatch was successful, update the state and show success notification
            setSelectedProductId(null);
            setIsModalOpen(false);
            showNotification();
          } catch (error) {
            // If there's an error during dispatch, show an error message
            showError();
            console.error("Error deleting product:", error);
          }
        } else {
          // Handle the case where productId exists in some productDetails
          showError();
          console.error("ProductId exists in some productDetails, not deleting");
          // You can display an additional error message here if needed
        }
      } else {
        console.error("dataForTableList is undefined or null");
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
      message: "Sản phẩm đang tồn tại trong hóa đơn, không thể xóa được!",
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
    dispatch(getProduct({ PageNumber: pageIndex, PageSize: pageSize }));
  };
  // xu ly xoa nhieu san pham
  const onDeleteSelectedProducts = async (selectedProductIds: number[]) => {
    const selectedIds = [];
    for (const product of dataForTable) {
      if (selectedProductIds.includes(product.key)) {
        selectedIds.push(product.id);
      }
    }
  
    try {
      if (selectedIds.length > 0) {
        // Check if any selected product ID exists in any receiptDetail
        const allProductIds = dataForTableList
          .flat()
          .map((product) => product.id);
  
        const hasProductIdInReceiptDetail = selectedIds.some((selectedId) =>
          allProductIds.includes(selectedId)
        );
  
        if (!hasProductIdInReceiptDetail) {
          await dispatch(deleteMultiple(selectedIds));
          showNotification();
        } else {
          // Handle the case where at least one selected product ID exists in receiptDetail
          showError();
          console.error("At least one selected product ID exists in receiptDetail, not deleting");
          // You can display an additional error message here if needed
        }
      }
    } catch (error) {
      // Handle errors if needed
      console.error("Error deleting multiple products:", error);
    }
  };
  

  // export excel
    const ExportExcel = () =>{
      axios.get('https://localhost:7199/api/Product/ExportExcel', { responseType: 'arraybuffer' })
    .then((response) => {
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'Products.xlsx');
      showNotificationExport();
    })
    .catch((error) => {
      console.error("Error when calling API to export Excel:", error);
    });
    }
  // import excel
  const importExcel = (file: any) => {
    setUploadedFile(file); // Lưu file đã tải lên vào state
  
    if (file) { // Kiểm tra xem file có tồn tại
      const formData = new FormData();
      formData.append('file', file);
  
      console.log("formData", formData);
  
      // Make a POST request to the API endpoint
      axios.post('https://localhost:7199/api/Product/ImportExcel', formData)
        .then((response) => {
          // Handle the response from the API if needed
          showNotificationImport();
          console.log('File uploaded successfully', response);
          setTimeout(() => {
            window.location.reload();
          }, 3000); // Thời gian chờ 3 giây (3000 milliseconds
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
          console.error('Error uploading file', error);
        });
    }
  };
  

  //data table
  const statusMappings: { [key: string]: string } = {
    "1": "Phổ biến",
    "2": "Mới nhất",
    "3": "Bán chạy",
    "4": "Giảm giá",
    "5": "Hết hàng",
  };
  const dataForTable = productList.map((product, index) => {
    const category = categoryList.find(
      (category) => category.id === product.categoryId
    );
    const categoryName = category ? category.name : "Unknown Category";
    const brand = brandList.find((brand) => brand.id === product.brandId);
    const brandName = brand ? brand.name : "Unknown Category";
    const formattedPrice = (+product.price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    const formattedDateCreate = moment(product.createdDT).format("DD-MM-YYYY");
    const status = statusMappings[product.status] || "Không rõ";
    return {
      key: index,
      id: product.id,
      name: product.productName,
      thumnail: product.thumnail,
      category: categoryName,
      brand: brandName,
      quantity: product.quantity,
      price: formattedPrice,
      status: status,
      dateCreate: formattedDateCreate,
    };
  });
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "id",
      width: 150,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: 400,
      render: (text: any, record: any) => (
        <div>
          <img
            className="product__table__img"
            src={record.thumnail}
            style={{ width: "50px" }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      width: 150,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      width: 150,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 150,
    },
    {
      title: "Giá",
      dataIndex: "price",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 200,
      render: (text: any, record: any) => (
        <span>
          {text === "Phổ biến" ? (
            <span className="customIcon">
              <div className="circle"></div>
              {text}
            </span>
          ) : text === "Mới nhất" ? (
            <span className="customIcon customIcon__new">
              <div className="circle circle__new"></div>
              {text}
            </span>
          ) : text === "Bán chạy" ? (
            <span className="customIcon customIcon__sell">
              <div className="circle circle__sell"></div>
              {text}
            </span>
          ) : text === "Giảm giá" ? (
            <span className="customIcon customIcon__sale">
              <div className="circle circle__sale"></div>
              {text}
            </span>
          ) :
          text === "Hết hàng" ? (
            <span className="customIcon customIcon__out">
              <div className="circle circle__out"></div>
              {text}
            </span>
          ) :
          (
            <span className="defaultClassName">
              <div className="circle"></div>
              {text}
            </span>
          )}
        </span>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "dateCreate",
      width: 300,
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      fixed: 'right',
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
                    <Link to={ROUTE_PATHS.EditProduct.replace(":id", record.id.toString())}>
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
      width: 100,
    },
  ];

  return (
    <>
      <TableComponent
        columns={columns}
        data={dataForTable}
        placeholder="Tìm kiếm sản phẩm"
        totalPage={productCount}
        // onProductSelect={handleSelectedProductIds}
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
        <img src={deleteIcon} alt="" className="modal__product__icon" />
        <div className="modal__product__content">
          <h2 className="modal__product__content--title">Xóa sản phẩm</h2>
          <p className="modal__product__content--desc">
            Bạn có chắc chắn muốn xóa sản phẩm này không?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ProductTable;
