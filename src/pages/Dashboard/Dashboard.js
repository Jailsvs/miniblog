//CSS
import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

//hooks
import { useAuthValue } from '../../contexts/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';


const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard