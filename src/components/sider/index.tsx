import { MdDashboard } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa6";
import { MdAssignmentAdd } from "react-icons/md";
import { Layout, Menu } from 'antd';
import { FcAcceptDatabase } from "react-icons/fc";
import { TbWriting } from "react-icons/tb";
import { TbVocabulary } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { FaTeamspeak } from "react-icons/fa";
const { Sider } = Layout;

interface IProps {
  collapsed: boolean;
  pathName: string;
}

const SiderLayout = (props: IProps) => {
  const { collapsed, pathName } = props
  const navigate = useNavigate()
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div>
        <h1 style={{ color: 'white', textAlign: 'center', padding: '16px' }}>
          {collapsed ? 'Logo' : 'Big Logo'}
        </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[`${pathName}`]}
        items={[
          {
            key: '/',
            icon: <MdDashboard />,
            label: 'Dashboard',
            onClick: () => navigate('/')
          },
          {
            key: 'user',
            icon: <FaUserAlt />,
            label: 'Users',
            onClick: () => navigate('/user')
          },
          {
            key: 'role',
            icon: <FaUserLock />,
            label: 'Roles',
            onClick: () => navigate('/role')
          },
          {
            key: 'permission',
            icon: <FcAcceptDatabase />,
            label: 'Permissions',
            onClick: () => navigate('/permission')
          },
          {
            key: 'test',
            icon: <MdAssignmentAdd />,
            label: 'Test',
            onClick: () => navigate('/test')
          },
          {
            key: 'writing',
            icon: <TbWriting />,
            label: 'Writing',
            onClick: () => navigate('/writing')
          },
          {
            key: 'vocabulary',
            icon: <TbVocabulary />,
            label: 'Vocabulary',
            onClick: () => navigate('/vocabulary')
          },
          {
            key: 'speaking',
            icon: <FaTeamspeak />,
            label: 'Speaking',
            onClick: () => navigate('/speaking')
          }
        ]}
      />
    </Sider>
  )
}

export default SiderLayout