import { useState } from 'react';
import { Table, Spin, Alert, Space } from 'antd';
import useFetchUsers from './hooks/useFetchUsers';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import useFetchUserInfo from './hooks/useFetchUserInfo ';


const DetailPanel = ({ userId }: { userId: number }) =>{
    const { data:userInfo, isLoading, isError } = useFetchUserInfo({ id: userId });
    
    if (isLoading) return <Spin />; // Show spinner while loading
    if (isError) return <Alert type="error" message="Error Loading User Info" />;

    return (
      <Space direction="vertical" size="middle">
        <div><b>Company Name:</b> {userInfo?.company.name}</div>
        <div><b>Website:</b> {userInfo?.website}</div>
        <div><b>Phone:</b> {userInfo?.phone}</div>
        <div><b>Address:</b> {`${userInfo?.address.street}, ${userInfo?.address.city}, ${userInfo?.address.zipcode}`}</div>
      </Space>
    );
};

const DisplayUserData = () => {
    const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
    const { data: users, isLoading, isError } =useFetchUsers();
  
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: { name: string }, b:{name:string}) => a.name.localeCompare(b.name),
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        sorter: (a: { username: string }, b:{username:string}) => a.username.localeCompare(b.username),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a: { email: string }, b:{email:string}) => a.email.localeCompare(b.email),
      },
    ];
  
    if (isLoading) {
      return <Spin />; // Show spinner while data is loading
    }
  
    if (isError) {
      return <Alert type="error" message="Error Loading Data" />; // Show error message if data fails to load
    }
  
    return (
      <>
      <h2 style={{textAlign:'center',color:'blue',}}>User Data</h2>
        <Table
        dataSource={users} // Data from the API
        columns={columns}  // Table columns for name, username, and email
        rowKey={(record) => record.id} // Set unique row key as user ID
        expandable={{
          expandedRowRender: (record) => <DetailPanel userId={record.id} />, // Show user details when a row is expanded
          expandedRowKeys,
          onExpand: (expanded, record) => {
            setExpandedRowKeys(expanded ? [record.id] : []); // Expand only one row at a time
          },
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <MinusOutlined onClick={(e) => onExpand(record, e)} /> // Collapse icon
            ) : (
              <PlusOutlined onClick={(e) => onExpand(record, e)} /> // Expand icon
            ),
        }}
      />
      </>
   
    );
  };
  
  export default DisplayUserData;
  
