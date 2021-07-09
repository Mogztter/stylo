import React from 'react'

import styles from "./SimpleTimeline.module.scss";
import { Link } from "react-router-dom";


export default function SimpleTimeline () {

  const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));
  console.log(new Intl.DateTimeFormat('en-US').format(date));
  console.log(new Intl.DateTimeFormat(['ban', 'id']).format(date));
  console.log(new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'long' }).format(date));

  return (
    <ul className={styles.timeline}>
      <li className={styles.timelineLatestEntry}>
        <div className={styles.timelineDate}>
          <time dateTime="2021-07-09">9 juillet</time>
        </div>
        <div className={styles.timelineEntry}>
          <Link to={`/article/60086af3fe8cd51cc522f114/version/60e8142bcf92ef3ff85b307e`}>Autosaved 1.10</Link>
          <p className={styles.timelineAuthorLine}>By <span className={styles.timelineAuthorName}>ggrossetie</span></p>
        </div>
      </li>
      <li>
        <div className={styles.timelineDate}>
          <time dateTime="2021-02-10">10 février</time>
        </div>
        <div className={styles.timelineEntry}>
          <Link to={`/article/60086af3fe8cd51cc522f114/version/6023c02dba5f174e9c13cbe5`}>No label 1.9</Link>
          <p className={styles.timelineAuthorLine}>By <span className={styles.timelineAuthorName}>ggrossetie</span></p>
        </div>
      </li>
      <li>
        <div className={styles.timelineDate}>
          <time dateTime="2021-02-10">10 février</time>
        </div>
        <div className={styles.timelineEntry}>
          <Link to={`/article/60086af3fe8cd51cc522f114/version/6023c027ba5f174e9c13cbe3`}>No label 1.8</Link>
          <p className={styles.timelineAuthorLine}>By <span className={styles.timelineAuthorName}>ggrossetie</span></p>
        </div>
      </li>
      <li>
        <div className={styles.timelineDate}>
          <time dateTime="2021-02-10">10 février</time>
        </div>
        <div className={styles.timelineEntry}>
          <Link to={`/article/60086af3fe8cd51cc522f114/version/6023c01fba5f174e9c13cbe1`}>No label 1.7</Link>
          <p className={styles.timelineAuthorLine}>By <span className={styles.timelineAuthorName}>ggrossetie</span></p>
        </div>
      </li>
    </ul>
  )
}
