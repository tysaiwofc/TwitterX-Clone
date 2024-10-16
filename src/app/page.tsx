
import Feed from '@/components/feed';
import SideBar from '@/components/leftsidebar';
import RightSideBar from '@/components/rightsidebar';
import Popup from '@/components/popup';
import LoadingScreen from '@/components/loading';
export const metadata = {
  title: 'Home / X',
  description: 'Home',
};

const DashboardPage = () => {
  
  return (
    <div className='flex flex-row'>
      <SideBar/>
      <Feed/>
      <RightSideBar/>
      <LoadingScreen />
    </div>
  );
};

export default DashboardPage;
