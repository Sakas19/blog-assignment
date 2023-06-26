import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import styles from './Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Welcome to Feel Good Stories!</h1>
            <h2 className={styles.subHeading}>Home of Inspiring Short Stories</h2>
            <p className={styles.paragraph}>
                Dive into a world full of inspiring and uplifting short stories. Each tale is crafted to 
                uplift your spirit, ignite your imagination, and make you feel good. 
                It's not just about reading, but about experiencing and feeling each word. Enjoy the journey!
            </p>
            <Link href="/blog" passHref>
                <button className={styles.diveInButton}>Dive In</button>
            </Link>
        </div>
    );
}



