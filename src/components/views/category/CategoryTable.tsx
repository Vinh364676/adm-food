import TableComponent from "../../tableComponent/TableComponent";
import {
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import deleteIcon from "../../../assets/images/product/deleteIcon.svg";
import { Dropdown, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../constants/url-config";
import axios from "axios";
import LoadingComponent from "../../loading/loadingComponent";
interface Items {
  id: string;
  name: string;
  status: string;
  bannerUrl: string;
}
interface ItemsProduct {
  categoryId: number;
}
const CategoryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading,setLoading] = useState(false);
  const [items, setItems] = useState<Items[]>([]);
  const [itemProducts, setItemProducts] = useState<ItemsProduct[]>([]);
  
  useEffect(() => {
    fetch("https://viviepi-food-app-api.onrender.com/categories/api/get/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi kết nối mạng hoặc phản hồi không thành công");
        }
        return response.json();
      })
      .then((data) => {
        // Cập nhật state categories với dữ liệu từ API
        setItems(data.data);
      })
      .catch((error) => {
        // Xử lý lỗi bằng cách cập nhật state error
      });
  }, []);
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
        setItemProducts(data.data);
      })
      .catch((error) => {
      
      });
  }, []);
  const deleteAPI = async (selectedId: any) => {
    try {
      const response = await axios.delete(`https://viviepi-food-app-api.onrender.com/categories/api/delete?id=${selectedId}`);
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
    setLoading(true)
    if (selectedId !== null) {
      try {
        const hasProducts = itemProducts.some(
          (product) => product.categoryId === selectedId
        );
        if (hasProducts) {
          showError();
          setLoading(false)
        } else {
      
          await deleteAPI(selectedId);
          setSelectedId(null);
          setIsModalOpen(false);
          showNotification();
          setLoading(false)
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
      duration: 3,
    });
  };
  const showError = () => {
    notification.error({
      className: "notification__item notification__item--error",
      message: "Danh mục đang tồn tại sản phẩm, không thể xóa được!",
      //   description: 'Sản phẩm đã được xóa thành công!',
      duration: 3,
    });
    setIsModalOpen(false);
  };

  const onChangePage = (pageIndex: any, pageSize: any) => {
    // dispatch(getSupplier({ PageNumber: pageIndex, PageSize: pageSize }));
  };

  const onDeleteSelectedProducts = async () => {};

  const ExportExcel = () => {};
  const importExcel = () => {};

  const dataForTable = items.map((item, index) => {
    
    return {
      key: index,
      id: item.id,
      name: item.name,
      status: item.status,
      banner: item.bannerUrl,
    };
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      width: 200,
    },
    {
      title: 'Ảnh danh mục',
      dataIndex: 'banner',
      key: 'banner',
      width: 300,
      render: (banner:any) => <img src={banner} alt="Ảnh" style={{ width: "30%", maxHeight: "30%"}} />,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 150,
    },
   
    {
      title: "Thao tác",
      width: 150,
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

    },
  ];

  return (
    <>
      {loading?<LoadingComponent/>: <TableComponent
        columns={columns}
        data={dataForTable}
        placeholder="Tìm kiếm danh mục"
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
          <h2 className="modal__product__content--title">Xóa danh mục</h2>
          <p className="modal__product__content--desc">
            Bạn có chắc chắn muốn xóa danh mục này không?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default CategoryTable;
