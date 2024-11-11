'use client';
import Image from 'next/image';
import styles from '@/app/ui/dashboard/equiment-detail/equipment-detail.module.css';
import Pagination from '@/app/ui/dashboard/pagination/pagination';

const EquipDetailPage = () => {
    
    

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.equipment}>
                                <Image
                                    src="/images/noequipment.jpg"
                                    alt="Equipment Image"
                                    width={40}
                                    height={40}
                                    className={styles.equipmentImage}
                                />
                                Dumbbells
                            </div>
                        </td>
                        <td>5</td>
                        <td>
                           Available
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination />
        </div>
    );
}

export default EquipDetailPage;
