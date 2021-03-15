
import { ContentProvider } from './contexts/ContentContext';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ContentProvider>
        <SideBar />
        <Content />
      </ContentProvider>
    </div>
  );
}