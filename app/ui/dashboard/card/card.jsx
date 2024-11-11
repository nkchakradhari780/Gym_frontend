import styles from './card.module.css';
import { MdSupervisedUserCircle } from 'react-icons/md';


const Card = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle />
        <div className={styles.texts}>
          <span className={styles.title}>Total Users</span>
          <span className={styles.number}>10</span>
          <span className={styles.detail}>
          </span>
      </div>
    </div>
            

  );
};

export default Card;