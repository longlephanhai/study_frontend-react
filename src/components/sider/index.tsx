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
import { TbTextGrammar } from "react-icons/tb";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6 } from "react-icons/ri";
import { FcDepartment } from "react-icons/fc";
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
          },
          {
            key: 'grammar',
            icon: <TbTextGrammar />,
            label: 'Grammar',
            onClick: () => navigate('/grammar')
          },
          {
            key: 'parts',
            icon: <FcDepartment />,
            label: 'Parts',
            children: [
              {
                key: 'part1',
                icon: <RiNumber1 />,
                label: 'Part 1',
                onClick: () => navigate('/part1')
              },
              {
                key: 'part2',
                icon: <RiNumber2 />,
                label: 'Part 2',
                onClick: () => navigate('/part2')
              },
              {
                key: 'part3',
                icon: <RiNumber3 />,
                label: 'Part 3',
                onClick: () => navigate('/part3')
              },
              {
                key: 'part4',
                icon: <RiNumber4 />,
                label: 'Part 4',
                onClick: () => navigate('/part4')
              },
              {
                key: 'part5',
                icon: <RiNumber5 />,
                label: 'Part 5',
                onClick: () => navigate('/part5')
              },
              {
                key: 'part6',
                icon: <RiNumber6 />,
                label: 'Part 6',
                onClick: () => navigate('/part6')
              }
            ]
          },
        ]}
      />
    </Sider>
  )
}

export default SiderLayout