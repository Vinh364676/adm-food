import React, { useEffect, useState } from 'react';
import TableComponent from '../../tableComponent/TableComponent';
import { Dropdown, Modal } from 'antd';
import { dispatch, useSelector } from '../../../redux/store';
import deleteIcon from "../../../assets/images/product/deleteIcon.svg";
import { getReceipt, getReceiptDetail } from '../../../redux/slices/receipt';
import { getSupplier } from '../../../redux/slices/supplier';
import { ReceiptDetail } from '../../../@types/receipt';
import { getProduct } from '../../../redux/slices/product';
import moment from 'moment';
import {
  EllipsisOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FilterOutlined,
  CheckCircleOutlined,
  EditOutlined,
  PrinterOutlined
} from "@ant-design/icons";
import { ROUTE_PATHS } from '../../../constants/url-config';
import LocalUtils from '../../../utils/local';
import { LOCAL_STORAGE_KEYS } from '../../../constants/local';
const ReceiptTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {receiptList,receiptCount,receiptDetail} = useSelector(state => state.receipt)
  const {productList} = useSelector(state => state.product)
  const {supplierList} = useSelector(state => state.supplier)

  useEffect(() => {
    dispatch(
      getSupplier({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      getProduct({
        pageIndex: 1,
        pageSize: 100,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      getReceipt({
        // pageIndex: 1,
        // pageSize: 10,
      })
    );
  }, []);
  useEffect(() => {
    dispatch(
      getReceiptDetail({
        // pageIndex: 1,
        // pageSize: 10,
      })
    );
  }, []);
  const combinedData = receiptList.map(receipt => {
    const details = Array.isArray(receiptDetail)
      ? receiptDetail.filter(detail => detail.receiptId === receipt.id)
      : [];
    return { ...receipt, receiptDetails: details };
  });
  
  console.log('====================================');
  console.log("combinedData", combinedData);
  console.log('====================================');
  
  const handlePrint = (id:number) => {
    const headers = new Headers();
    const token = LocalUtils.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    headers.append('accept', '*/*');
    headers.append('Authorization', `Bearer ${token}`);
  
    fetch(`https://localhost:7199/api/Receipt/GeneratePdf?${id}`, {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `DonNhap_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 150,
    },
    {
      title: "Sản phẩm",
      dataIndex: "productIds",
      width: 700,
      className:"product__item"
      
    },
    
    {
      title: "Nhân viên",
      dataIndex: "name",
      width: 700,
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "name",
      width: 700,
    },
    {
      title: "Số lượng",
      dataIndex: "quantiy",
      width: 700,
    },
    {
      title: "Giá nhập",
      dataIndex: "price",
      width: 700,
    },
    {
      title: "Ngày nhập",
      dataIndex: "createDate",
      width: 300,
    },
    {
      title: "Tổng cộng",
      dataIndex: "total",
      width: 300,
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   render: (text: any, record: any) => (
    //     <span>
    //       {text === "Published" ? (
    //         <span className="status__publish">{text}</span>
    //       ) : null}
    //       {text === "Low Stock" ? (
    //         <span className="status__low">{text}</span>
    //       ) : null}
    //     </span>
    //   ),
    //   width: 150,
    // },
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
                  label: "In",
                  key: "0",
                  icon: <PrinterOutlined />,
                  onClick: () => handlePrint(record.id),
                  // className: "drop--delete",
                  // onClick: () => showModal(record.brandID),
                },
                // {
                //   label: "Xóa",
                //   key: "0",
                //   icon: <DeleteOutlined />,
                //   className: "drop--delete",
                //   onClick: () => showModal(record.brandID),
                // },
                // {
                //   label: (
                //     <Link to={ROUTE_PATHS.EditBrand.replace(":id", record.brandID.toString())}>
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
      width: 100,
    },
  ];
  

  const dataForTable = combinedData.map((receipt, index) => {
    const supplier = supplierList.find((supplier) => supplier.id === receipt.supplierId);

    const supplierName = supplier ? supplier.name : "Unknown Category";
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
    const productQuantities = productDetails.map((product) => product.quantity);
const productPrices = productDetails.map((product) => product.price);
    const productNamesWithLineBreaks = productDetails.map((product, index, array) => (
      <React.Fragment key={product.id}>
        {product.productName}
        {index !== array.length - 1 && <br />} {/* Add <br> after all items except the last one */}
      </React.Fragment>
    ));
    const productQuantitiesWithLineBreaks = productQuantities.map((quantity, index, array) => (
      <React.Fragment key={index}>
        {quantity}
        {index !== array.length - 1 && <br />}
      </React.Fragment>
    ));
    
    const productPricesWithLineBreaks = productPrices.map((price, index, array) => {
      // Định dạng giá thành tiền Việt Nam
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    
      return (
        <React.Fragment key={index}>
          {formattedPrice}
          {index !== array.length - 1 && <br />}
        </React.Fragment>
      );
    });
    
    const createDate = moment(receipt.createDate).format('DD-MM-YYYY');
    const formattedPrice = (+receipt.total).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    
    return {
      key: index,
      id: receipt.id,
      name: supplierName,
      createDate: createDate,
      productIds:productNamesWithLineBreaks,
      quantiy:productQuantitiesWithLineBreaks,
      price:productPricesWithLineBreaks,
      total:formattedPrice
      // Thêm các trường khác từ combinedData tùy thuộc vào yêu cầu của bạn
      // detailsId: receipt.details ? receipt.details.id : null,
      // productId: productIds,
      // quantity: receipt.details ? receipt.details.quantity : null,
      // price: receipt.details ? receipt.details.price : null,
    };
  });
  
  // Bạn có thể sử dụng dataForTable như sau
  console.log(dataForTable);
  const onDeleteSelected = async (selectedItem: number[]) => {
    // const selectedIds = [];
    // for (const item of dataForTable) {
    //   if (selectedItem.includes(item.key)) {
    //     selectedIds.push(item.brandID);
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
  const onChangePage = (pageIndex: any, pageSize: any) => {
    // dispatch(getBrand({ PageNumber: pageIndex, PageSize: pageSize }));
  };
  const ExportExcel = () =>{}
  const ImportExcel = () => {

  }

  const handleOk = async () => {
    // if (selectedBrandId !== null) {
    //   try {
    //     const hasProducts = productList.some(product => product.brandId === selectedBrandId);
    //     if (hasProducts) {
    //       // Hiển thị thông báo lỗi
    //       showBrandHasProductsError();
    //     } else {
    //       // Nếu không có sản phẩm liên quan, thực hiện xóa brand như bình thường.
    //       await dispatch(deleteBrand(selectedBrandId));
    //       setSelectedBrandId(null);
    //       setIsModalOpen(false);
    //       showNotification();
    //     }
    //   } catch (error) {
    //     console.error("Error deleting brand:", error);
    //   }
    // }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <TableComponent
        columns={columns}
        data={dataForTable}
        placeholder="Tìm kiếm hoá đơn"
        totalPage={receiptCount}
        onDeleteCheckBox={onDeleteSelected}
        onChangePage={onChangePage}
        exportOnClick={ExportExcel}
        importOnClick={ImportExcel}
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
          <h2 className="modal__product__content--title">Xóa thương hiệu</h2>
          <p className="modal__product__content--desc">
            Bạn có chắc chắn muốn xóa thương hiệu này không?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ReceiptTable;