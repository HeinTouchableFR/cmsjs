import styles from './content.module.scss';
import React from 'react';
import Link from 'next/link';
import LinkBouton from '../Bouton/LinkBouton';

export default function Content({ title, icon, url, action, children }) {
  return (
    <>
      <div className={styles.contentHeader}>
        <div className={styles.contentHeaderColumn}>
          <h1 className={styles.contentHeaderTitle}>
            <i className={'fad' + ' ' + icon + ' ' + styles.circular} />
            <div className={styles.content}>
              {title}
              {!action && <div className={styles.contentHeaderTitleSub}>Gérer les {title}</div>}
            </div>
          </h1>
          {!action && <LinkBouton url={'/admin/' + url + '/ajouter'} label={'Créer'} icon={'fa-plus'} />}
        </div>
        <div className={styles.adminTree}>
          <div className={styles.adminTreeSection}>
            <Link href={'/admin'}>
              <a className={styles.adminTreeSection}>Administration</a>
            </Link>
            <i className={'fas fa-chevron-right ' + styles.adminTreeChevron} />
            <Link href={'/admin/' + url}>
              <a className={styles.adminTreeSection}>{title}</a>
            </Link>
            {action && (
              <>
                <i className={'fas fa-chevron-right ' + styles.adminTreeChevron} />
                <Link href={'/admin/' + url + '/' + action}>
                  <a className={styles.adminTreeSection}>{action}</a>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className={styles.adminContent}>{children}</div>
      </div>
    </>
  );
}
