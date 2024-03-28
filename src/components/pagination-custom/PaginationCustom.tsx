import { Button } from 'antd';
import React from 'react';
import './PaginaitonCustom.scss'; // Import file CSS cho component
import { ArrowLeftOutlined,ArrowRightOutlined } from '@ant-design/icons';
type Props = {
    current: any,
    total: any,
    pageSize: any,
    onChange: any
}

const CustomPagination = ({ current, total, pageSize, onChange }: Props) => {
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="customPagination">
            <Button
                disabled={current <= 1}
                onClick={() => onChange(current - 1)}
                className="customPagination__button"
            >
                <ArrowLeftOutlined />
            </Button>
            <span className="customPagination__text">Page {current} of {totalPages}</span>
            <Button
                disabled={current >= totalPages}
                onClick={() => onChange(current + 1)}
                className="customPagination__button"
            >
               <ArrowRightOutlined />
            </Button>
        </div>
    );
};

export default CustomPagination;
