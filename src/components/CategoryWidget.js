import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';

// FIRESTORE IMPORT
import { collection, getDocs} from "firebase/firestore";
import { db } from '../firebase/firebase'

import styles from './styles/CategoryWidget.module.css';

export const CategoryWidget = () => {
    const [visible, setVisible] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const {docs} = await getDocs(collection(db, "categories"));
            const category = docs.map((doc)=>{
                return {
                    id: doc.id,
                    key:doc.data().key,
                    name:doc.data().name
                }
            })
            setCategories(category)
        }
        getCategories()
    }, [])

    return (
        <div className={styles.content}>
            <span href="/" onClick={() => setVisible(!visible)}
            >Categoría</span>
            <ul className={`${styles.contentList} ${visible ? styles.show : null}`}
                onMouseLeave={() => setVisible(!visible)}>
                {categories.map((category)=>
(                <li key={category.key}><Link to={`/${category.name}`}>{category.name}</Link></li>
)                )}
            </ul>
        </div>

    )
}


    