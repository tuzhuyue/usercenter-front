import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import {Button, Dropdown, Image, Space, Tag} from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
import {searchUsers} from "@/services/ant-design-pro/api";
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};



const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户昵称',
    dataIndex: 'username',

  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',

  },
  {
    title: '用户头像',
    dataIndex: 'avatarUrl',

    render: (_, record) => (
        <div>
          <Image src={record.avatarUrl} width={100} height ={100}/>
        </div>
    )

  },
  {
    title: '性别',
    dataIndex: 'gender',

  },
  {
    title: '密码',
    dataIndex: 'userPassword',

  },
  {
    title: '邮箱',
    dataIndex: 'email',

  },
  {
    title: '状态',
    dataIndex: 'userStatus',
  },
  {
    title: '星球码',
    dataIndex: 'planetCode',
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueEnum: {
      0: {text: '普通用户', status: 'Default'},
      1: {text: '管理员', status: 'success',
      },
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime'
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
      <ProTable<API.CurrentUser>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            console.log(sort, filter);
            const  userList = await  searchUsers();
            return {
              data:userList
            }
          }}
          editable={{
            type: 'multiple',
          }}
          columnsState={{
            persistenceKey: 'pro-table-singe-demos',
            persistenceType: 'localStorage',
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
            syncToUrl: (values, type) => {
              if (type === 'get') {
                return {
                  ...values,
                  created_at: [values.startTime, values.endTime],
                };
              }
              return values;
            },
          }}
          pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="高级表格"

      />
  );
};
