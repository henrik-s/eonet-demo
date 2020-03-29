import * as React from 'react';
import classnames from 'classnames';

import styles from './style.sass';

import * as Filters from '@/app/filter/';

interface Props extends Filters.Date.Props {
    status: Filters.Status.RadioOptions
    setStatus: (status: Filters.Status.RadioOptions) => void
    onCategoryChange: (selectedOptions: Array<Filters.Category.Option>) => void
}

const Header = (props: Props) => {
    return (
        <header className={styles.container}>
            <h1>Earth Observatory Natural Event Tracker (EONET) Demo</h1>
            <div className={styles.filterContainer}>
                <FilterGroup title='Date' classNames={styles.date}>
                    <Filters.Date.Component {...props} />
                </FilterGroup>
                <FilterGroup title='Status'>
                    <Filters.Status.Component {...props} />
                </FilterGroup>
                <FilterGroup title='Category' classNames={styles.category}>
                    <Filters.Category.Component onChange={props.onCategoryChange} />
                </FilterGroup>
            </div>
        </header>
    );
};

interface FilterGroupProps {
    title: string
    children: React.ReactNode
    classNames?: string
}

const FilterGroup = (props: FilterGroupProps) => {
    return (
        <div className={classnames(styles.filterGroup, props.classNames)}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.body}>{props.children}</div>
        </div>
    );
};

export const Component = Header;
