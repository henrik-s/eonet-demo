import * as React from 'react';
import Select from 'react-select';
import _ from 'underscore';

import styles from './style.sass';

import {
    API as api,
    eonet,
} from '@/api';

export interface Option {
    value: string
    label: string
}

export function filter(events: Array<eonet.Event>, selectedOptions: Array<Option>): Array<eonet.Event> {
    const selectedIds = _.map(selectedOptions, (option) => Number(option.value));
    if (selectedIds.length === 0) return events;

    return _.filter(events, (event) => {
        const eventCategoryIds = _.pluck(event.categories, 'id');

        return _.intersection(eventCategoryIds, selectedIds).length > 0;
    });
}

interface Props {
    onChange: (selectedOptions: Array<Option>) => void
}

const CategoryFilter = (props: Props) => {
    const [options, setOptions] = React.useState([] as Array<Option>);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        api.getCategories((catgories) => {
            const loadedOptions: Array<Option> = catgories.map((category) => {
                return {
                    value: category.id.toString(),
                    label: category.title,
                };
            });
            setOptions(_.sortBy(loadedOptions, (value) => value.label));
            setIsLoading(false);
        });
    }, []);

    function getPlaceholderText() {
        if (isLoading) return 'Loading...';

        return options.length > 0 ? 'Select...' : 'Unable to load categories';
    }

    return (
        <Select
            options={options}
            isDisabled={options.length === 0}
            isMulti={true}
            placeholder={getPlaceholderText()}
            className={styles.container}
            classNamePrefix={'eonet'}
            onChange={props.onChange}
        />
    );
};

export const Component = CategoryFilter;
