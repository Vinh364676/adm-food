import TableComponent from "../../tableComponent/TableComponent";
import {
  EllipsisOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Dropdown, Modal, Select, notification } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingComponent from "../../loading/loadingComponent";
import moment from "moment";
interface Items {
  id: string;
  userId: string;
  name:string;
  phone:string
  deliveryAddress: string;
  description: string;
  date: string;
  totalPrice:string;
  status:string;
}
interface ItemsUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}
interface ItemsDetail {
  id: string;
  foodId: string;
  quantity: string;
  billId: string;
}
interface ItemsProduct {
  id: number;
  name: string;
}
const OrderTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading,setLoading] = useState(true);
  const [items, setItems] = useState<Items[]>([]);
  const [itemsUser, setItemsUser] = useState<ItemsUser[]>([]);
  const [details, setDetails] = useState<ItemsDetail[]>([]);
  const [products, setProducts] = useState<ItemsProduct[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  console.log('====================================');
  console.log("details",details);
  console.log('====================================');
  useEffect(() => {
    fetch("https://viviepi-food-app-api.onrender.com/bill/api/get/all")
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
  useEffect(() => {
    fetch("https://viviepi-food-app-api.onrender.com/user/api/get/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi kết nối mạng hoặc phản hồi không thành công");
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setItemsUser(data.data);
      })
      .catch((error) => {
      
      });
  }, []);
  useEffect(() => {
    fetch("https://viviepi-food-app-api.onrender.com/bill-detail/api/get/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi kết nối mạng hoặc phản hồi không thành công");
        }
        setLoading(false);
        return response.json();
      })
      .then((data) => {
        setDetails(data.data);
      })
      .catch((error) => {
      
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
        setProducts(data.data);
      })
      .catch((error) => {
      
      });
  }, []);
  const updateAPI = async (selectedId: any, data: any) => {
    try {
      const response = await axios.put(`https://viviepi-food-app-api.onrender.com/bill/api/update/${selectedId}`, data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error('Error updating bill:', error);
      throw error;
    }
  };
  const showModal = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (selectedId !== null && selectedStatus !== null) {
      try {
        const data = {
          status: selectedStatus
        };
  
        await updateAPI(selectedId, data); // Truyền cả selectedId và data
        setSelectedId(null);
        setIsModalOpen(false);
        showNotification();
      } catch (error) {
        console.error("error:", error);
      }
    }
  };
  

  const handleCancel = () => {
    setIsModalOpen(false);
  };  
  const handleSelectChange = (value:any) => {
    // Xử lý sự kiện khi giá trị của Select thay đổi
    setSelectedStatus(value);
  };

  //thong bao
  const showNotification = () => {
    notification.success({
      className: "notification__item",
      message: "Cập nhật thành công",
      duration: 3,
    });
  };
  const onChangePage = (pageIndex: any, pageSize: any) => {
    // dispatch(getSupplier({ PageNumber: pageIndex, PageSize: pageSize }));
  };

  const onDeleteSelectedProducts = async () => {};

  const ExportExcel = () => {};
  const importExcel = () => {};
  const getFullNameByUserId = (userId: string): string => {
    const user = itemsUser.find((user) => user.id === userId);
    return user ? user.fullName : '';
  };

  const dataForTable = items.map((item, index) => {
    const date = moment(item.date).add(7, 'hours').format("HH:mm:ss DD-MM-YYYY");

    const value = (+item.totalPrice).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    const statusMap = {
      0: "Chờ xác nhận",
      1: "Đang giao hàng",
      2: "Hoàn thành"
    };
  
    // Kiểm tra nếu thuộc tính 'status' là một số
    const statusText = typeof item.status === 'number' ? statusMap[item.status] : item.status;
    const fullName = getFullNameByUserId(item.userId);
    const billDetails = details.filter(detail => detail.billId === item.id);
    let foodIds: string[] = [];
    let quantities: number[] = []; // Mảng lưu trữ quantities tương ứng với foodIds
    
    billDetails.forEach(detail => {
      foodIds.push(detail.foodId);
      quantities.push(parseInt(detail.quantity)); // Thêm quantity vào mảng quantities
    });
    const foodNames = foodIds.map(foodId => {
      const product = products.find(product => product.id === parseInt(foodId));
      return product ? product.name : 'Unknown'; // Nếu không tìm thấy sản phẩm, trả về 'Unknown'
    });

    return {
      key: index,
      id: item.id,
      name: fullName,
      userId: item.userId,
      value: value,
      phone:item.phone,
      date:date,
      address:item.deliveryAddress,
      desc: item.description,
      status:statusText,
      foodIds: foodIds.join(', '),
      foodNames:foodNames.join(', '),
      totalQuantity:quantities.join(', '),
      demo : foodNames.map((foodName, index) => `${foodName} [${quantities[index]}]`).join(',')


    };
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 50,
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Sản phẩm",
      dataIndex: "demo",
      width: 200,
      render: (text:any, record:any) => (
        <span dangerouslySetInnerHTML={{
          __html: record.demo.split(',').join('<br><br>')
        }} />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      width: 200,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 200,
    },
    {
      title: "Thời gian",
      dataIndex: "date",
      width: 200,
    },
   
    {
      title: "Giá trị",
      dataIndex: "value",
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
                  icon: <EyeOutlined />,
                  onClick: () => showModal(record.id),
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
        placeholder="Tìm kiếm đơn hàng"
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
        <div className="modal__product__content">
          <h2 className="modal__product__content--title">
            Thay đổi trạng thái
          </h2>
          <Select
            placeholder="Trạng thái"
            className="select__order form__product__card__select"
            onChange={handleSelectChange}
          value={selectedStatus}
          >
            <Select.Option value="0">Chờ Xác nhận</Select.Option>
            <Select.Option value="1">Giao hàng</Select.Option>
            <Select.Option value="2">Hoàn thành</Select.Option>
          </Select>
        </div>
      </Modal>
    </>
  );
};

export default OrderTable;
