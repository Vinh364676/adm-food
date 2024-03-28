import TableComponent from "../../tableComponent/TableComponent";
import {
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import deleteIcon from "../../../assets/images/product/deleteIcon.svg";
import { Dropdown, Menu, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/url-config";
import { dispatch, useSelector } from "../../../redux/store";
import { deleteBrand, deleteMultiple, getBrand } from "../../../redux/slices/brand";
import moment from "moment";
import { getProduct } from "../../../redux/slices/product";

const BrandTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { brandList,brandCount } = useSelector((state) => state.brand);
  const {productList} = useSelector(state => state.product);
  console.log(brandList)
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  console.log(selectedBrandId);
  useEffect(() => {
    dispatch(
      getBrand({
        pageIndex: 1,
        pageSize: 10,
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
      try {
        const hasProducts = productList.some(product => product.brandId === selectedBrandId);
        if (hasProducts) {
          // Hiển thị thông báo lỗi
          showBrandHasProductsError();
        } else {
          // Nếu không có sản phẩm liên quan, thực hiện xóa brand như bình thường.
          await dispatch(deleteBrand(selectedBrandId));
          setSelectedBrandId(null);
          setIsModalOpen(false);
          showNotification();
        }
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };

  const onDeleteSelected = async (selectedItem: number[]) => {
    const selectedIds: number[] = [];

    
    for (const item of dataForTable) {
      if (selectedItem.includes(item.key)) {
        selectedIds.push(item.brandID);
      }
    }
  
    try {
      if (selectedIds.length > 0) {
        // Kiểm tra xem có sản phẩm thuộc các brand cần xóa không
        const hasProducts = productList.some(product => selectedIds.includes(product.brandId));
  
        if (hasProducts) {
          // Hiển thị thông báo lỗi
          showBrandHasProductsError();
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
  

  const onChangePage = (pageIndex: any, pageSize: any) => {
    dispatch(getBrand({ PageNumber: pageIndex, PageSize: pageSize }));
  };
  const ExportExcel = () =>{}
  const ImportExcel = () => {

  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataForTable = brandList.map((brand, index) => ({
    key: index,
    brandID: brand.id,
    name: brand.name,
    dateCreate: moment(brand.createdDT).format("DD-MM-YYYY")
  }));
  const columns = [
    {
      title: "ID",
      dataIndex: "brandID",
      width: 150,
    },
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      width: 300,
    },
    {
      title: "Ngày tạo",
      dataIndex: "dateCreate",
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
                  label: "Xóa",
                  key: "0",
                  icon: <DeleteOutlined />,
                  className: "drop--delete",
                  onClick: () => showModal(record.brandID),
                },
                {
                  label: (
                    <Link to={ROUTE_PATHS.EditBrand.replace(":id", record.brandID.toString())}>
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
        placeholder="Tìm kiếm thương hiệu"
        totalPage={brandCount}
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
          <h2 className="modal__product__content--title">Xóa thương hiệu</h2>
          <p className="modal__product__content--desc">
            Bạn có chắc chắn muốn xóa thương hiệu này không?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default BrandTable;
