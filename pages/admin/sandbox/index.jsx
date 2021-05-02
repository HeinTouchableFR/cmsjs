import React from 'react';
import DarkModeButton from 'components/Button/DarkModeButton/DarkModeButton';
import Input from '../../../components/Form/Input/Input';
import TextArea from '../../../components/Form/TextArea/TextArea';
import Dropdown from '../../../components/Form/Dropdown/Dropdown';
import {contentWidthOptions} from '../../../variables/options';
import Checkbox from '../../../components/Form/Checkbox/Checkbox';
import Button from '../../../components/Button/Button';
import ActionButton from '../../../components/Button/ActionButton/ActionButton';
import Flash from '../../../components/Flash/Flash';

export default function Index() {
    return (
        <>
            <DarkModeButton />
            <div className='sandbox-container'>
                <Input
                    label='test'
                    required
                    tip={'test'}
                />
                <TextArea
                    label='test'
                    required
                />
                <Dropdown
                    label='test'
                    required
                    options={contentWidthOptions}
                />
                <Checkbox
                    label='test'
                    required
                />
                <ActionButton
                    label='label'
                    type='submit'
                />
                <Button
                    label='label'
                    type='submit'
                />
                <Flash
                    error={{status:'500', code:'test', message: 'test test'}}
                />
            </div>
        </>
    );
}
