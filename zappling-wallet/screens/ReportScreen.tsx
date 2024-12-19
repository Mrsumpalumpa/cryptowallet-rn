import Report from '../components/Report';
import ReportProvider from '../providers/ReportProvider';
import { ReportScreenProps } from '../models/generics';
import { StatusBar } from 'expo-status-bar';

const ReportScreen = (props:ReportScreenProps) => {
    return (
      <>
        <ReportProvider>
          <Report {...props}/>
        </ReportProvider>
      </>
  )};
export default ReportScreen