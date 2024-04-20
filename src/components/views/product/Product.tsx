import TableComponent from "../../tableComponent/TableComponent";
import {
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import deleteIcon from "../../../assets/images/product/deleteIcon.svg";
import { Dropdown, Modal, notification } from "antd";
import "./Product.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/url-config";
import axios from "axios";
import LoadingComponent from "../../loading/loadingComponent";
interface Items {
  id: number;
  name: string;
  categoryId: string;
  description: string;
  quantity: string;
  price: string;
  imgUrl:string;
}
const ProductTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading,setLoading] = useState(true);
  const [items, setItems] = useState<Items[]>([]);
  useEffect(() => {
    fetch("https://viviepi-food-app-api.onrender.com/food/api/get/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi kết nối mạng hoặc phản hồi không thành công");
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setItems(data.data);
      })
      .catch((error) => {
      
      });
  }, []);
  const deleteAPI = async (selectedId: any) => {
    try {
      const response = await axios.delete(`https://viviepi-food-app-api.onrender.com/food/api/delete?id=${selectedId}`);
      setLoading(false);
      return response.data;
     
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Error deleting category:', error);
      throw error;
    }
  };
  const showModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedId !== null) {
      try {
        await deleteAPI(selectedId);
        // await dispatch(deleteSupplier(selectedId));
        setSelectedId(null);
        setIsModalOpen(false);
        showNotification();
      } catch (error) {
        console.error("erorr:", error);
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
      duration: 3,
    });
  };
  const onChangePage = (pageIndex: any, pageSize: any) => {
    // dispatch(getSupplier({ PageNumber: pageIndex, PageSize: pageSize }));
  };

  const onDeleteSelectedProducts = async () => {};

  const ExportExcel = () => {};
  const importExcel = () => {};

  const dataForTable = items.map((item, index) => {
    const value = (+item.price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return {
      key: index,
      id: item.id,
      name: item.name,
      category: item.categoryId,
      value: value,
      imgUrl: item.imgUrl,
      desc: item.description,
    };
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      width: 200,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      width: 200,
    },
    {
      title: 'Ảnh sản phẩm',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      width: 300,
      render: (banner:any) => <img src={banner} alt="Ảnh" style={{ width: "45%", maxHeight: "35%"}} />,
    },
    {
      title: "Giá trị",
      dataIndex: "value",
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
                    <Link
                      to={ROUTE_PATHS.EditVoucher.replace(
                        ":id",
                        record.id.toString()
                      )}
                    >
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
      {loading?<LoadingComponent/>: <TableComponent
        columns={columns}
        data={dataForTable}
        placeholder="Tìm kiếm sản phẩm"
        totalPage={1}
        onDeleteCheckBox={onDeleteSelectedProducts}
        onChangePage={onChangePage}
        exportOnClick={ExportExcel}
        importOnClick={importExcel}
      />}
     
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
