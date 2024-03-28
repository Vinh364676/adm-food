import TableComponent from "../../tableComponent/TableComponent";
import {
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import deleteIcon from "../../../assets/images/product/deleteIcon.svg";
import { Dropdown, Menu, Modal, Switch, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/url-config";
import { dispatch, useSelector } from "../../../redux/store";
import { deleteBrand, deleteMultiple, getBrand } from "../../../redux/slices/brand";
import moment from "moment";
import { getProduct } from "../../../redux/slices/product";
import { getCustomer } from "../../../redux/slices/customer";

const CustomerTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { customerList,customerCount } = useSelector((state) => state.customer);
  console.log('====================================');
  console.log("customerList",customerList);
  console.log('====================================');
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  console.log(selectedBrandId);
  useEffect(() => {
    dispatch(
      getCustomer({
        pageIndex: 1,
        pageSize: 10,
      })
    );
  }, []);
  const showNotification = () => {
    notification.success({
      className: "notification__item",
      message: "Xóa thành công",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
  };
  const showBrandHasProductsError = () => {
    notification.error({
      className: "notification__item notification__item--error",
      message: "Thương hiệu đang tồn tại sản phẩm, không thể xóa được!",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
    setIsModalOpen(false);
  };
  const showModal = (brandID: number) => {
    setSelectedBrandId(brandID);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedBrandId !== null) {
      await dispatch(deleteBrand(selectedBrandId));
          setSelectedBrandId(null);
          setIsModalOpen(false);
          showNotification();
    }
  };

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
    dispatch(getCustomer({ PageNumber: pageIndex, PageSize: pageSize }));
  };
  const ExportExcel = () =>{}
  const ImportExcel = () => {

  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataForTable = customerList.map((customer, index) => ({
    key: index,
    id: customer.id,
    name: customer.fullName,
    gender: customer.gender === 0 ? 'Nam' : 'Nữ',
    email:customer.email,
    phone:customer.phoneNumber,
    date:moment(customer.dateOfBirth).format("DD-MM-YYYY")
    // dateCreate: moment(brand.createdDT).format("DD-MM-YYYY")
  }));
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 150,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      width: 300,
    },
    {
      title: "Ngày sinh",
      dataIndex: "date",
      width: 300,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: 300,
    },
    {
        title: "Email",
        dataIndex: "email",
        width: 300,
      },
      {
        title: "Điện thoại",
        dataIndex: "phone",
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
                // {
                //   label: "Xóa",
                //   key: "0",
                //   icon: <DeleteOutlined />,
                //   className: "drop--delete",
                //   onClick: () => showModal(record.brandID),
                // },
                {
                  label: (
                    <Link to={ROUTE_PATHS.EditCustomer.replace(":id", record.id.toString())}>
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
        placeholder="Tìm kiếm khách hàng"
        totalPage={customerCount}
        onDeleteCheckBox={onDeleteSelected}
        onChangePage={onChangePage}
        exportOnClick={ExportExcel}
        importOnClick={ImportExcel}

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
          <h2 className="modal__product__content--title">Xóa khách hàng</h2>
          <p className="modal__product__content--desc">
            Bạn có chắc chắn muốn xóa khách hàng này không?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CustomerTable;
